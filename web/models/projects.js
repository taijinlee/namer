define([
  './baseCollection',
  './project'
], function(BaseCollection, ProjectModel) {
  return BaseCollection.extend({
    url: 'projects',
    model: ProjectModel
  });
});
