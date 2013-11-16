define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'models/shared',
  'text!./form.html'
], function($, _, Backbone, vent, sharedData, formTemplate) {
  return Backbone.View.extend({
    render: function() {
      this.$el.html(_.template(formTemplate));
      return this;
    },

    events: {
      'submit #loginForm': 'login'
    },

    login: function(event) {
      event.preventDefault();

      var values = { type: 'base' };
      _.each($(event.currentTarget).serializeArray(), function(field) {
        values[field.name] = field.value;
      });

      $.post('/api/auth/login', values, function() {
        // TODO(taijinlee): super hack. not sure why i need this.
        sharedData.socket.socket.connect();
        vent.on('after:connect', function() {
          Backbone.history.navigate('/project', { trigger: true });
        });
      }).fail(function() {
        console.log('failed??');
      });
      return false;
    }
  });
});
