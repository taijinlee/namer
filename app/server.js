var config = require('config');
var fs = require('fs');
var cookie = require('cookie');
var NodeStatic = require('node-static');
var tokenizer = require(process.env.APP_ROOT + '/lib/tokenizer.js');

var file = new NodeStatic.Server(process.env.APP_ROOT + '/web');
var baseIndex = fs.readFileSync(process.env.APP_ROOT + '/web/index.html');
var store = require(process.env.APP_ROOT + '/store/store.js')('mongo', config.store.mongo);

var baseHandler = function(req, res) {
  if (require(process.env.APP_ROOT + '/app/ajaxRoutes.js')(store, req, res)) { return; }

  req.addListener('end', function() {
    if (process.env.NODE_ENV === 'dev') {
      req.url = req.url.replace(/^\/VERSION/, '');
    }
    file.serve(req, res, function(error, result) {
      if (error) {
        res.writeHead(200);
        return res.end(baseIndex);
      }
    });
  }).resume();
};

var app = require('http').createServer(baseHandler);
var io = require('socket.io').listen(app);

io.configure(function() {
  io.set('authorization', function(handshakeData, done) {
    handshakeData.userId = null;

    var cookies = cookie.parse(handshakeData.headers.cookie);
    var loginToken = cookies._namer_token;
    if (!loginToken) { return done(null, false); }

    var userId = loginToken.slice(0, loginToken.indexOf(':'));
    var tokenParts = loginToken.split(':');
    tokenParts.unshift(config.auth.salt);
    if (!tokenizer.match.apply(null, tokenParts)) { return done(null, false); }

    handshakeData.userId = userId;
    return done(null, true);
  });
});

io.configure('prod', function() {
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging

  // enable all transports (optional if you want flashsocket support, please note that some hosting
  // providers do not allow you to create servers that listen on a port different than 80 or their
  // default port)
  io.set('transports', [
    'websocket',
    'flashsocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
  ]);
});

// load routes
require(process.env.APP_ROOT + '/app/routes.js')(io, store);

app.listen(config.app.port);
console.log('listening on ' + config.app.port);
