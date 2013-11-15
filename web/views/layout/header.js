define([
  'underscore',
  'backbone',
  'models/shared',
  'text!./header.html'
], function(_, Backbone, sharedModels, headerTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.listenTo(sharedModels.cookie, 'change', this.render);
    },

    render: function() {
      this.$el.html(_.template(headerTemplate, { isLoggedIn: sharedModels.cookie.get('_namer_token') }));
      return this;
    }
  });
});
