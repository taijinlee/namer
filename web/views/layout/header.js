define([
  'underscore',
  'backbone',
  'models/shared',
  'text!./header.html'
], function(_, Backbone, sharedModels, headerTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.user = sharedModels.user;
    },

    render: function() {
      if (sharedModels.cookie.get('userId')) {
        this.user.fetch({
          success: _.bind(this.renderUser, this)
        });
        return this;
      }
      this.renderUser();
      return this;
    },

    renderUser: function() {
      this.$el.html(_.template(headerTemplate, { isLoggedIn: this.user.get('email') }));
    }
  });
});
