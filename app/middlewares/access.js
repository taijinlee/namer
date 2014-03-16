module.exports = function(store) {

  var collaboratorModel = require(process.env.APP_ROOT + '/app/models/collaborator.js')(store);
  var access = {};

  access.isCollaborator = function(userId, projectId, done) {
    collaboratorModel.retrieve({ userId: userId, projectId: projectId }, function(error, collaborator) {
      if (error) { return done(error); }
      var isCollaborator = collaborator ? true : false;
      return done(null, collaborator);
    });
  };

  access.verifyCollaborator = function(userId, projectId, done) {
    access.isCollaborator(userId, projectId, function(error, isCollaborator) {
      if (error) { return done(error); }
      if (!isCollaborator) { return done(new Error('not a collaborator on project')); }
      return done(null);
    });
  };


  access.isAdmin = function(userId, projectId, done) {
    collaboratorModel.retrieve({ userId: userId, projectId: projectId }, function(error, collaborator) {
      if (error) { return done(error); }
      var isAdmin = !collaborator ? false : collaborator.isAdmin;
      return done(null, isAdmin);
    });
  };

  access.canWrite = function() {

  };

  access.canRead = function() {

  };

  return access;
};
