
var Model = require(process.env.APP_ROOT + '/app/models/base.js');

module.exports = function(store) {
  var user = new Model(store, 'namer', 'users');
  return users;
};
