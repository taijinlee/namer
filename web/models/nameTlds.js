define([
  'backbone',
  './nameTld'
], function(Backbone, NameTldModel) {
  return Backbone.Collection.extend({
    model: NameTldModel
  });
});
