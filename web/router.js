define([
  'jquery',
  'underscore',
  'backbone',
  'views/home',
  'views/project/project'
], function($, _, Backbone, HomeView, ProjectView) {

  return Backbone.Router.extend({
    initialize: function() {
      this.home = new HomeView();
      this.project = new ProjectView();

      this.$base = $('#container');

      Backbone.history.start({ pushState: true });
    },

    routes: {
      '': 'home',
      'project/:id': 'project',
      '*splat': 'goHome'
    },

    home: function() {
      this.home.setElement(this.$base).render();
    },

    project: function(id) {
      this.project.setElement(this.$base).render(id);
    },

    goHome: function() {
      return Backbone.history.navigate('', { trigger: true });
    }
  });
});
