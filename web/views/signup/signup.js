define([
  'jquery',
  'underscore',
  'backbone',
  'text!./form.html'
], function($, _, Backbone, formTemplate) {

  return Backbone.View.extend({
    render: function() {
      this.$el.html(_.template(formTemplate));
      return this;
    },

    events: {
      'submit #signupForm': 'signup'
    },

    signup: function(event) {
      event.preventDefault(); event.stopPropagation();
      var values = {};

      _.each(this.$('form').serializeArray(), function(field) {
        values[field.name] = field.value;
      });

      $.post('/api/auth', values, function() {

      }).fail(function() {

      });
      return false;
    }


  });

  return SignupView;

});
