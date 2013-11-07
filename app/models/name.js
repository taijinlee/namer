
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'names' }, {
    id: { type: 'string' },
    proejctId: { type: 'string' },
    name: { type: 'string' },
    availability: { type: 'object' },
    createdBy: { type: 'string' },
    isArchived: { type: 'bool' }
  });
};
