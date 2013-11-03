module.exports = function(io, store) {

  io.sockets.on('connection', function (socket) {


    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

};
