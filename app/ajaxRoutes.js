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
  var projectModel = require(process.env.APP_ROOT + '/app/models/project.js')(store);
  var collaboratorModel = require(process.env.APP_ROOT + '/app/models/collaborator.js')(store);

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    async.auto({
      body: async.apply(getBody, req),
      authData: ['body', function(done, results) {
        authModel.retrieve({ type: 'base', identifier: results.body.identifier }, done);
      }],
      checkAuth: ['authData', function(done, results) {
        var authData = results.authData;
        if (!authData || !tokenizer.match(authData.salt, results.body.secret, 0, 0, authData.secret)) {
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
      body: async.apply(getBody, req),
      validate: ['body', function(done, results) {
        if (results.body.type !== 'base') { return done(new Error('invalid auth type')); }
        done(null);
      }],
      userId: ['validate', async.apply(function(done) { done(null, store.generateId()); })],
      createUser: ['userId', function(done, results) {
        userModel.insert({
          id: results.userId,
          email: results.body.identifier
        }, done);
      }],
      createAuth: ['userId', function(done, results) {
        var authData = {
          id: results.userId + '|' + results.body.type,
          userId: results.userId,
          type: results.body.type,
          identifier: results.body.identifier,
          salt: tokenizer.generateSalt()
        };
        authData.secret = tokenizer.generate(authData.salt, results.body.secret, 0, 0);

        authModel.insert(authData, done);
      }],
      createProject: ['userId', function(done, results) {
        projectModel.insert({
          id: store.generateId(),
          name: 'untitled',
          tlds: ['com', 'org', 'net'],
          createdBy: results.userId
        }, done);
      }],
      createCollaborator: ['createProject', function(done, results) {
        collaboratorModel.insert({
          id: store.generateId(),
          userId: results.userId,
          projectId: results.createProject.id,
          isAdmin: true
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
