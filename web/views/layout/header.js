define([
  'underscore',
  'backbone',
  'views/shared/horizontalLinks/horizontalLinks',
  'text!./header.html'
], function(_, Backbone, HorizontalLinksView, headerTemplate) {
  return Backbone.View.extend({
    initialize: function() {
    },

    render: function() {
      this.$el.html(_.template(headerTemplate, { isLoggedIn: false }));
      return this;
    }
  });
});
