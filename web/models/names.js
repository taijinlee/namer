define([
  'backbone',
  './name'
], function(Backbone, NameModel) {
  return Backbone.Collection.extend({
    url: 'names',
    model: NameModel
  });
});
