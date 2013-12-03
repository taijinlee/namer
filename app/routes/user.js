module.exports = function(socket, store) {
  var userModel = require(process.env.APP_ROOT + '/app/models/user.js')(store);

  socket.on('user:read', function(data, callback) {
    if (data.id !== socket.handshake.userId) {
      return callback(new Error('Cannot read other user'));
    }

    return userModel.retrieve(data, callback);
  });
};
