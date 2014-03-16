/** @jsx React.DOM */
define([
  'react',
  'backbone',
  'models/shared',
  'jsx!views/home'
], function(React, Backbone, sharedData, Home) {
  return Backbone.Router.extend({
    initialize: function() {
      this.openComponent = null;
    },

    routes: {
      '': 'home',
      'signup': 'signup',
      'login': 'login',
      'logout': 'logout',
      'project': 'project',
      'project/:id': 'project',
      '*splat': 'goHome'
    },

    home: function() {
      sharedData.pages.home = sharedData.pages.home || Home(sharedData);
      this.openComponent = React.renderComponent(
        sharedData.pages.home, document.getElementById('container')
      );
    },

    signup: function() {
    },

    login: function() {
    },

    project: function(id) {
      if (!this.isLoggedIn()) { return Backbone.history.navigate('', { trigger: true }); }
      this.project.setElement(this.$base).render(id);
    },

    logout: function() {
      $.removeCookie('_namer_token');
      sharedData.cookie.clear();
      sharedData.socket.disconnect()

      sharedData.user.clear();
      sharedData.user.resetFetched();

      this.goHome();
    },

    goHome: function() {
      return Backbone.history.navigate('', { trigger: true });
    },

    isLoggedIn: function() {
      return sharedData.cookie.get('userId') ? true : false;
    }
  });
});
