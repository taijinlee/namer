var async = require('async');
var _ = require('underscore');

module.exports = function(socket, store) {
  var projectModel = require(process.env.APP_ROOT + '/app/models/project.js')(store);
  var collaboratorModel = require(process.env.APP_ROOT + '/app/models/collaborator.js')(store);

  socket.on('projects:read', function(criteria, callback) {
    // TODO(taijinlee): incorporate critera?
    var userId = socket.handshake.userId;
    async.auto({
      collaborators: function(done) {
        return collaboratorModel.query({ userId: userId }, {}, done);
      },
      projects: ['collaborators', function(done, results) {
        var projectIds = _.pluck(results.collaborators, 'projectId');
        projectModel.query({ id: { $in: projectIds }}, {}, done);
      }]
    }, function(error, results) {
      if (error) { return callback(error); }
      callback(null, results.projects);
    });
  });

  socket.on('project:update', function(data, callback) {
    // TODO(taijinlee): make sure project is writable by the user

    var projectId = data.id;
    delete data.id;
    projectModel.update({ id: projectId }, data, callback);
  });
};
