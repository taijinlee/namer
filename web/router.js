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
], function($, _, Backbone, sharedModels, LayoutView, HomeView, SignupView, LoginView, ProjectView) {

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
      this.getCookie();
      this.home.setElement(this.$base).render();
    },

    signup: function() {
      this.getCookie();
      this.signup.setElement(this.$base).render();
    },

    login: function() {
      this.getCookie();
      this.login.setElement(this.$base).render();
    },

    project: function(id) {
      this.getCookie();
      this.project.setElement(this.$base).render(id);
    },

    goHome: function() {
      this.getCookie();
      return Backbone.history.navigate('', { trigger: true });
    },

    getCookie: function() {
      var cookieJSON = document.cookie ? $.cookie() : {};
      sharedModels.cookie.set(cookieJSON);
    }
  });
});
