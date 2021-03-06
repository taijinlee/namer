
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  return new Model(store, { database: 'namer', collection: 'users' }, {
    id: { type: 'string' },
    email: { type: 'string' }
  });
};
