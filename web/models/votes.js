define([
  'backbone',
  './vote'
], function(Backbone, VoteModel) {
  return Backbone.Collection.extend({
    url: 'votes',
    model: VoteModel
  });
});
