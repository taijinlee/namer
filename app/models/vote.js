
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'votes' }, {
    id: { type: 'string' },
    userId: { type: 'string' },
    nameId: { type: 'string' },
    proejctId: { type: 'string' },
    vote: { type: 'vote' } // special type (+1 or -1)
  });
};
