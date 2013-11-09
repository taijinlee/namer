define([
  'underscore',
  'backbone',
  'text!./name.html'
], function(_, Backbone, nameRowTemplate) {
  return Backbone.View.extend({
    tagName: 'tr',
    render: function(name, tlds) {
      this.$el.html(_.template(nameRowTemplate, {
        name: name.get('name'),
        availability: name.get('availability'),
        tlds: tlds
      }));
      return this;
    }
  });
});
