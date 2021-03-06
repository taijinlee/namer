define([
  'async',
  'underscore',
  'backbone',
  './nameRow',
  'models/shared',
  'models/project',
  'models/name',
  'text!./project.html'
], function(async, _, Backbone, NameRowView, sharedData, ProjectModel, NameModel, projectTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.projects = sharedData.projects;
      this.names = sharedData.names;
      this.tlds = sharedData.tlds;
    },

    render: function(projectId) {
      // render loading screen

      var self = this;
      async.auto({
        getProjects: function(done) {
          self.projects.fetch({
            success: function(collection) {
              done(null, collection);
            },
            error: function() {
              done(new Error('bleh'));
            }
          });
        },
        project: ['getProjects', function(done, results) {
          if (projectId) {
            self.project = self.projects.get(projectId);
          } else if (self.projects.size() === 1) {
            self.project = self.projects.first();
          } else {
            self.project = self.projects.select(function(project) {
              project.createdBy === sharedData.cookie.get('userId');
            });
            self.project = self.project[0];
          }
          if (!self.project) { done(new Error('no project id')); }
          done(null, self.project);
        }],
        names: ['project', function(done, results) {
          self.names.fetch({
            data: { projectId: results.project.get('id') },
            success: function(collection) {
              done(null, collection);
            },
            error: function() {
              done(new Error('names error'));
            }
          });
        }]
      }, function(error, results) {
        if (error) { return Backbone.history.navigate('', { trigger: true }); }
        self.renderProject();
        self.listenTo(self.names, 'add remove reset', self.renderProject);
        self.listenTo(self.project, 'change', self.renderProject);
      });
      return this;
    },

    renderProject: function() {
      this.$el.html(_.template(projectTemplate, { project: this.project }));

      var $tbody = this.$('tbody');
      var projectTlds = this.project.get('tlds');

      this.names.each(function(name) {
        $tbody.append(new NameRowView().render(name, projectTlds).$el);
      });

      this.$addNameForm = this.$('#addName');
      this.$addTldForm = this.$('#addTld');
      return this;
    },

    events: {
      'submit #addName': 'addName',
      'submit #addTld': 'addTld'
    },

    addName: function(event) {
      event.preventDefault();

      // TODO(taijin): fix this jquery hack(?)
      var newName = this.$addNameForm.find('#newName').val();
      if (!newName) { return false; }

      var nameExists = this.names.find(function(name) { return name.get('name') === newName; });
      // TODO(taijinlee): make it so if name exists we message correctly
      if (nameExists) { return false; }

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
    },

    addTld: function(event) {
      event.preventDefault();

      // TODO(taijinlee): fix this jquery hack(?)
      var newTld = this.$addTldForm.find('#newTld').val();

      var currTlds = _.clone(this.project.get('tlds'));
      // TODO(taijinlee): fix messaging properly
      if (_.find(currTlds, function(tld) { return tld === newTld; })) { return false; }

      // TODO(taijinlee): add TLD checking
      currTlds.push(newTld);
      this.project.save({ tlds: currTlds });
    }
  });
});
