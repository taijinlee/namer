var async = require('async');

module.exports = function(socket, store) {
  var access = require(process.env.APP_ROOT + '/app/middlewares/access.js')(store);
  var nameModel = require(process.env.APP_ROOT + '/app/models/name.js')(store);

  socket.on('name:create', function(data, callback) {
    var userId = socket.handshake.userId;
    var projectId = data.projectId;

    async.auto({
      verifyCollaborator: function(done) { access.verifyCollaborator(userId, projectId, done); },
      createName: ['verifyCollaborator', function(done, results) {
        console.log('createting name!');
        data.id = store.generateId();
        nameModel.insert(data, done);
      }]
    }, function(error, results) {
      if (error) { return callback(error); }
      return callback(null, results.createName);
    });
  });

  socket.on('names:read', function(criteria, callback) {
    var userId = socket.handshake.userId;
    var projectId = criteria.projectId;
    console.log(criteria);
    async.auto({
      verifyCollaborator: function(done) { access.verifyCollaborator(userId, projectId, done); },
      names: ['verifyCollaborator', function(done, results) {
        nameModel.query({ projectId: projectId }, {}, done);
      }]
    }, function(error, results) {
      if (error) { return callback(error); }
      return callback(null, results.names);
    });
  });
};
