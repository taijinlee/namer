var config = require('config');
var fs = require('fs');

var baseHandler = function(req, res) {
  fs.readFile(process.env.APP_ROOT + '/index.html', function(error, data) {
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

var store = require(process.env.APP_ROOT + '/store/store.js')(datastore, config.store.mongo);

require('routes')(io, store);

app.listen(config.app.port);
io.sockets.on('connection', function (socket) {
  io.sockets.on('',)


  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
