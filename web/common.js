define([
  'async',
  'backbone',
  'bootstrap',
  'jquery',
  'jquery-cookie',
  'select2',
  'socketio',
  'text',
  'underscore'
], function() {
  var $ = window.$.noConflict();
  var _ = window._.noConflict();
  var Backbone = window.Backbone.noConflict();

  // set a globally delegated event for a tags.
  // when clicked, we'll use backbone navigate unless ctrl, meta key were held, or if it was not left click
  $('body').on('click', 'a', function(event) {
    if (event.which === 1 && !event.ctrlKey && !event.metaKey) {
      var location = $(event.currentTarget).attr('href');
      // slight hack. Ignore if href is a javascript action, which will allow it to execute
      if (location.indexOf('#') === 0) { return; }
      if (location.indexOf('javascript') === 0) { return; }
      if (location.indexOf('http') !== -1) { return; }

      event.preventDefault();
      event.stopPropagation();

      Backbone.history.navigate(location, { trigger: true });
    }
  });

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
