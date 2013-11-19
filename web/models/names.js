define([
  './baseCollection',
  './name'
], function(BaseCollection, NameModel) {
  return BaseCollection.extend({
    url: 'names',
    model: NameModel
  });
});
