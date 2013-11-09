
var wrench = require('wrench');
var _ = require('underscore');

/*
  'create': 'POST'
  'update': 'PUT',
  'patch':  'PATCH'
  'delete': 'DELETE'
  'read':   'GET'
*/

var routesBase = process.env.APP_ROOT + '/app/routes';

module.exports = function(io, store) {
  io.sockets.on('connection', function(socket) {
    _.each(wrench.readdirSyncRecursive(routesBase), function(route) {
      require(routesBase + '/' + route)(socket, store);
    });
  });
};
