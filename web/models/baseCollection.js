define([
  'backbone'
], function(Backbone) {
  return Backbone.Collection.extend({
    initialize: function() {
      this.hasFetched = false;
      this.on('sync', this.fetched, this);
    },
    fetched: function() {
      this.hasFetched = true;
    },
    resetFetch: function() {
      this.hasFetched = false;
    }
  });
});
