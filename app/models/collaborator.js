
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'collaborators' }, {
    id: { type: 'string' },
    userId: { type: 'string' },
    projectId: { type: 'string' },
    isAdmin: { type: 'bool' }
  });
};
