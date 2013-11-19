define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    initialize: function() {
      this.hasFetched = false;
      this.on('sync', this.fetched, this);
    },
    fetched: function() {
      this.hasFetched = true;
    },
    resetFetched: function() {
      this.hasFetched = false;
    }
  });
});
