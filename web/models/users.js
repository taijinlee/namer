define([
  'backbone',
  './user'
], function(Backbone, UserModel) {
  return Backbone.Collection.extend({
    url: 'users',
    model: UserModel
  });
});
