define([
  'backbone',
  './name'
], function(Backbone, NameModel) {
  return Backbone.Collection.extend({
    model: NameModel
  });
});
