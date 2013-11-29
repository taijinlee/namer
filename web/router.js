define([
  'jquery',
  'underscore',
  'backbone',
  'models/shared',
  'views/layout/layout',
  'views/home',
  'views/signup/signup',
  'views/login/login',
  'views/project/project'
], function($, _, Backbone, sharedData, LayoutView, HomeView, SignupView, LoginView, ProjectView) {
  return Backbone.Router.extend({
    initialize: function() {
      this.layout = new LayoutView();

      this.layout.setElement($('#container')).render();
      this.$base = this.layout.$('#pageBody');

      this.home = new HomeView();
      this.signup = new SignupView();
      this.login = new LoginView();
      this.project = new ProjectView();
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
      this.home.setElement(this.$base).render();
    },

    signup: function() {
      this.signup.setElement(this.$base).render();
    },

    login: function() {
      this.login.setElement(this.$base).render();
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
