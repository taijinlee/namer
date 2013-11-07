define([
  'backbone',
  './vote'
], function(Backbone, VoteModel) {
  return Backbone.Collection.extend({
    model: VoteModel
  });
});
