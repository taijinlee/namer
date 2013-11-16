var async = require('async');
var querystring = require('querystring');
var tokenizer = require(process.env.APP_ROOT + '/lib/tokenizer.js');
var cookie = require('cookie');

var authConfig = require('config').auth;

var getBody = function(req, callback) {
  var fullBody = '';
  req.on('data', function(chunk) {
    fullBody += chunk.toString();
  });

  req.on('end', function() {
    return callback(null, querystring.parse(fullBody));
  });
};

module.exports = function(store, req, res) {

  var authModel = require(process.env.APP_ROOT + '/app/models/auth.js')(store);
  var userModel = require(process.env.APP_ROOT + '/app/models/user.js')(store);

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    async.auto({
      getBody: async.apply(getBody, req),
      authData: ['getBody', function(done, results) {
        authModel.retrieve({ type: 'base', identifier: results.getBody.identifier }, done);
      }],
      checkAuth: ['authData', function(done, results) {
        var authData = results.authData;
        if (!authData || !tokenizer.match(authData.salt, results.getBody.secret, 0, 0, authData.secret)) {
          return done(new Error('unauthorized: incorrect password'));
        }
        done(null);
      }],
      cookie: ['checkAuth', function(done, results) {
        var userId = results.authData.userId;
        // give the user a good login cookie
        var time = (new Date()).getTime();
        var token = tokenizer.generate(authConfig.salt, userId, time, authConfig.ttl);
        var cookie = [userId, time, authConfig.ttl, token].join(':');
        return done(null, { cookie: cookie, expires: new Date(time + 86400000 * 365) });
      }]
    }, function(error, results) {
      if (error) {
        res.writeHead(401);
        return res.end();
      }
      var cookieToken = cookie.serialize('_namer_token', results.cookie.cookie, {
        expires: new Date(results.cookie.expires),
        path: '/'
      });
      res.setHeader('Set-Cookie', cookieToken);
      res.statusCode = 200;
      res.end('ok');
    });
    return true;
  }

  if (req.url === '/api/auth' && req.method === 'POST') {
    async.auto({
      getBody: async.apply(getBody, req),
      validate: ['getBody', function(done, results) {
        if (results.getBody.type !== 'base') { return done(new Error('invalid auth type')); }
        done(null);
      }],
      userId: ['validate', async.apply(function(done) { done(null, store.generateId()); })],
      createUser: ['userId', function(done, results) {
        userModel.insert({
          id: results.userId,
          email: body.identifier
        }, done);
      }],
      createAuth: ['userId', function(done, results) {
        var authData = {
          id: results.userId + '|' + body.type,
          userId: results.userId,
          type: body.type,
          identifier: body.identifier,
          salt: tokenizer.generateSalt()
        };
        authData.secret = tokenizer.generate(authData.salt, body.secret, 0, 0);

        authModel.insert(authData, done);
      }],
      createProject: ['userId', function(done, results) {
        projectModel.insert({
          id: store.generateId(),
          name: 'untitled',
          tlds: ['com', 'org', 'net'],
          createdBy: results.userId
        }, done);
      }]
    }, function(error, results) {
      if (error) {
        res.writeHead(400);
        return res.end();
      }
      res.writeHead(200);
      res.end();
    });
    return true;
  }

  return false;
};
