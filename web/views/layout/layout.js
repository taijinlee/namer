define([
  'underscore',
  'backbone',
  './header',
  './footer',
  'text!./layout.html'
], function(_, Backbone, HeaderView, FooterView, layoutTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.header = new HeaderView();
      this.footer = new FooterView();
    },

    render: function() {
      this.$el.html(_.template(layoutTemplate));
      this.header.setElement(this.$('#pageHeader')).render();
      this.footer.setElement(this.$('#pageFooter')).render();
      return this;
    }
  });
});
