var async = require('async');

module.exports = function(socket, store) {
  var collaboratorModel = require(process.env.APP_ROOT + '/app/models/collaborator.js')(store);
  var nameModel = require(process.env.APP_ROOT + '/app/models/name.js')(store);

  socket.on('name:create', function(data, callback) {
    data.id = store.generateId();
    nameModel.insert(data, callback);
  });

  socket.on('names:read', function(criteria, callback) {
    var userId = socket.handshake.userId;
    var projectId = criteria.projectId;
    async.auto({
      checkIsCollaborator: function(done) {
        collaboratorModel.retrieve({ userId: userId, projectId: projectId }, function(error, collaborator) {
          if (error) { return done(error); }
          if (!collaborator) {
            return done(new Error('not a collaborator on project'));
          }
          done(null, collaborator);
        });
      },
      names: ['checkIsCollaborator', function(done, results) {
        nameModel.query({ projectId: projectId }, {}, done);
      }]
    }, function(error, results) {
      if (error) { return callback(error); }
      callback(null, results.names);
    });
  });
};
