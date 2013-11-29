define([
  'underscore',
  'backbone',
  'models/shared',
  'text!./header.html'
], function(_, Backbone, sharedData, headerTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.user = sharedData.user;
      this.listenTo(this.user, 'change', this.render);
    },

    render: function() {
      var userId = this.user.get('id');
      if (userId) {
        this.user.fetch({
          data: { id: userId },
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
