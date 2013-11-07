define([
  'underscore',
  'backbone',
  './nameRow',
  'models/shared',
  'models/name',
  'models/nameTld',
  'models/nameTlds',
  'text!./project.html'
], function(_, Backbone, NameRowView, sharedData, NameModel, NameTldModel, NameTldsCollection, projectTemplate) {
  return Backbone.View.extend({
    initialize: function() {
      this.names = sharedData.names;
      this.tlds = sharedData.tlds;
      this.nameTlds = sharedData.nameTlds;
    },

    render: function() {
      var name = new NameModel({ id: 'myId', name: 'awesome sauce name', availability: {com: true, org: false, net: true} });
      this.names.add(name);

      this.$el.html(_.template(projectTemplate));

      this.$tbody = this.$('tbody');

      this.names.each(function(name) {
        this.$tbody.append(new NameRowView().render(name).$el);
      }, this);

      return this;
    }
  });
});
