module.exports = function(socket, store) {
  var userModel = require(process.env.APP_ROOT + '/app/models/user.js')(store);

  socket.on('user:read', function(data, callback) {
    userModel.retrieve(data, callback);
  });
};
