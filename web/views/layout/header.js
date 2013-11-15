define([
  'underscore',
  'backbone',
  'text!./header.html'
], function(_, Backbone, headerTemplate) {
  return Backbone.View.extend({
    initialize: function() {
    },

    render: function() {
      this.$el.html(_.template(headerTemplate, { isLoggedIn: false }));
      return this;
    }
  });
});
