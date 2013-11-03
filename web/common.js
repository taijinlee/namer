define([
  'jquery',
  'underscore',
  'backbone',
  'select2',
  'text',
], function() {
  var $ = window.$.noConflict();
  var _ = window._.noConflict();
  var Backbone = window.Backbone.noConflict();

  Backbone.View = Backbone.View.extend({
    getQueryParams: function() {
      var pairs = window.location.search.substring(1).split('&');
      var obj = {};
      for (var i in pairs) {
        if (pairs[i] === '') { continue; }

        var pair = pairs[i].split('=');
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return obj;
    }
  });

});
