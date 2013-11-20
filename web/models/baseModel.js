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
    },

    fetch: function(options) {
      var success = options.success;
      if (this.hasFetched) {
        if (success) { success(this); }
        return;
      }

      var model = this;
      options.success = function(model, resp, options) {
        model.hasFetched = true;
        if (success) { success(model, resp, options); }
      };
      return Backbone.Model.prototype.fetch.apply(this, arguments);
    }
  });
});
