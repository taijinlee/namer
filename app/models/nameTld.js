
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'nameTlds' }, {
    id: { type: 'string' },
    projectId: { type: 'string' },
    nameId: { type: 'string' },
    tldId: { type: 'string' },
    isAvailable: { type: 'bool' },
    lastChecked: { type: 'integer' }
  });
};
