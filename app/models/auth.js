
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'auths' }, {
    id: { type: 'string' },
    userId: { type: 'string' },
    type: { type: 'string' },
    secret: { type: 'string' },
    identifier: { type: 'string' },
    salt: { type: 'string' }
  });
};
