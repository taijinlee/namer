module.exports = function(socket, store) {
  var nameModel = require(process.env.APP_ROOT + '/app/models/name.js')(store);

  socket.on('name:create', function(data, callback) {
    nameModel.insert(data, callback);
  });
};
