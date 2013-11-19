var async = require('async');
var _ = require('underscore');

module.exports = function(socket, store) {
  var projectModel = require(process.env.APP_ROOT + '/app/models/project.js')(store);
  var collaboratorModel = require(process.env.APP_ROOT + '/app/models/collaborator.js')(store);

  socket.on('projects:read', function(criteria, callback) {
    var userId = socket.handshake.userId;
    criteria.userId = socket.handshake.userId;
    async.auto({
      collaborators: function(done) {
        return collaboratorModel.query({ userId: userId }, -1, 0, done);
      },
      projects: ['collaborators', function(done, results) {
        var projectIds = _.pluck(results.collaborators, 'projectId');
        projectModel.query({ id: { $in: projectIds }}, -1, 0, done);
      }]
    }, function(error, results) {
      if (error) { return callback(error); }
      callback(null, results.projects);
    });
  });
};
