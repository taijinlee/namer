define([
  'jquery',
  'underscore',
  'backbone',
  'views/layout/layout',
  'views/home',
  'views/signup/signup',
  'views/login/login',
  'views/project/project'
], function($, _, Backbone, LayoutView, HomeView, SignupView, LoginView, ProjectView) {

  return Backbone.Router.extend({
    initialize: function() {
      this.layout = new LayoutView();

      this.layout.setElement($('#container')).render();
      this.$base = this.layout.$('#pageBody');

      this.home = new HomeView();
      this.signup = new SignupView();
      this.login = new LoginView();
      this.project = new ProjectView();

      Backbone.history.start({ pushState: true });
    },

    routes: {
      '': 'home',
      'signup': 'signup',
      'login': 'login',
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
      this.project.setElement(this.$base).render(id);
    },

    goHome: function() {
      return Backbone.history.navigate('', { trigger: true });
    }
  });
});
