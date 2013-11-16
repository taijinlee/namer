define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/shared'
], function($, _, Backbone, Router, sharedData) {
  var router = new Router();

  var socket = sharedData.socket = io.connect();
  socket.socket.on('error', function(reason) {
    socket.disconnect();
    $.removeCookie('_namer_token');
    console.error('Unable to connect Socket.IO', reason);
  });

  socket.on('connect', function() {
    var cookie = document.cookie ? $.cookie() : {};
    sharedData.cookie.set(cookie);

    var userId = cookie._namer_token.split(':')[0];
    sharedData.user.set({ id: userId });
    sharedData.user.fetch();
  });

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

  Backbone.sync = function(method, model, options) {
    var url = options.url || _.result(model, 'url');
    if (!url) { throw new Error('A "url" property or function must be specified'); }
    /*
      methods
      'create': 'POST',
      'update': 'PUT',
      'patch':  'PATCH',
      'delete': 'DELETE',
      'read':   'GET'
    */

    var data = model.toJSON();
    var success = options.success;

    // model.trigger('request', model, xhr, options);
    socket.emit(url + ':' + method, data, function(error, data) {
      // TODO(taijinlee): figure out what cases these are and how to catch them properly
      if (error) { return options.error(error); }
      return success(data);
    });
/*
    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    return xhr;

    console.log(method, model, options);
*/
  };
});
