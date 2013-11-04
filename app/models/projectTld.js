
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'projectTlds' }, {
    id: { type: 'string' },
    projectId: { type: 'string' },
    tld: { typd: 'string' }
  });
};
