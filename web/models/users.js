define([
  './baseCollection',
  './user'
], function(BaseCollection, UserModel) {
  return BaseCollection.extend({
    url: 'users',
    model: UserModel
  });
});
