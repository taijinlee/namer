

module.exports = function(socket, store) {
  var nameModel = require(process.env.APP_ROOT + '/app/models/name.js')(store);

  socket.on('name:create', function(data, callback) {
    console.log(data);
    nameModel.insert(data, function(error, data) {
      console.log(error); console.log(data);
      callback(error, data);
    });
  });

};
