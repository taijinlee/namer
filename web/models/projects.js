define([
  'backbone',
  './user'
], function(Backbone, UserModel) {
  return Backbone.Collection.extend({
    model: UserModel
  });
});
