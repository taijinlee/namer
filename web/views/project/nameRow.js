define([
  'underscore',
  'backbone',
  'text!./name.html'
], function(_, Backbone, nameRowTemplate) {
  return Backbone.View.extend({
    tagName: 'tr',
    render: function(name) {
      this.$el.html(_.template(nameRowTemplate, { name: name, availability: name.get('availability') }));
      return this;
    }
  });
});
