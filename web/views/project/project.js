define([
  'underscore',
  'backbone',
  './nameRow',
  'models/shared',
  'models/project',
  'models/name',
  'text!./project.html'
], function(_, Backbone, NameRowView, sharedData, ProjectModel, NameModel, projectTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.projects = sharedData.projects;
      this.names = sharedData.names;
      this.tlds = sharedData.tlds;
    },

    render: function(projectId) {
      if (this.projects.hasFetched) {
        this.renderProject(projectId);
      } else {
        var self = this;
        this.projects.fetch({
          success: function() { self.renderProject(projectId); }
        });
      }
      return this;
    },

    renderProject: function(projectId) {
      if (projectId) {
        this.project = this.projects.get(projectId);
      } else {
        if (this.projects.size() === 1) {
          this.project = this.projects.first();
        } else {
          this.project = this.projects.select(function(project) {
            project.createdBy === sharedData.cookie.get('userId');
          });
          this.project = this.project[0];
          // could still be no project?
        }
      }

      var name = new NameModel({ id: 'myId', name: 'awesome sauce name', availability: {com: true, org: false, net: true} });
      this.names.add(name);

      this.$el.html(_.template(projectTemplate, { project: this.project }));

      var $tbody = this.$('tbody');
      var projectTlds = this.project.get('tlds');

      this.names.each(function(name) {
        $tbody.append(new NameRowView().render(name, projectTlds).$el);
      });

      this.$addNameForm = this.$('#addName');
      return this;
    },

    events: {
      'submit #addName': 'addName'
    },

    addName: function(event) {
      event.preventDefault();
      // TODO(taijin): fix this hack(?)
      var newName = this.$addNameForm.find('#newName').val();
      var availability = _.reduce(this.project.get('tlds'), function(memo, tld) {
        memo[tld] = null; return memo;
      }, {});

      var newNameModel = new NameModel({
        projectId: this.project.get('id'),
        name: newName,
        availability: availability,
        createdBy: 'me',
        isArchived: false
      });
      newNameModel.save();
      this.names.add(newNameModel);
    }
  });
});
