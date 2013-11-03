var config = require('config');
var fs = require('fs');

var baseHandler = function(req, res) {
  fs.readFile(process.env.APP_ROOT + '/web/index.html', function(error, data) {
    if (error) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
};

var app = require('http').createServer(baseHandler);
var io = require('socket.io').listen(app);

io.configure(function() {
  io.set('authorization', function(handshakeData, done) {
    console.log(handshakeData);
    done(null, true);
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


var store = require(process.env.APP_ROOT + '/store/store.js')('mongo', config.store.mongo);

// load routes
require(process.env.APP_ROOT + '/app/routes.js')(io, store);

app.listen(config.app.port);
console.log('listening on ' + config.app.port);
