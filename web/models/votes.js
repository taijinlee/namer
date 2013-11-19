define([
  './baseCollection',
  './vote'
], function(BaseCollection, VoteModel) {
  return BaseCollection.extend({
    url: 'votes',
    model: VoteModel
  });
});
