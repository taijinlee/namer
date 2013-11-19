define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'router',
  'models/shared'
], function($, _, Backbone, vent, Router, sharedData) {
  var cookie = document.cookie ? $.cookie() : {};
  sharedData.cookie.set(cookie);

  var socket = sharedData.socket = io.connect();
  socket.socket.on('error', function(reason) {
    $.removeCookie('_namer_token');
    console.error('Unable to connect Socket.IO', reason);
    socket.disconnect();
  });

  socket.on('connect', function() {
    var cookie = document.cookie ? $.cookie() : {};
    sharedData.cookie.set(cookie);

    var userId = cookie._namer_token.split(':')[0];
    sharedData.user.set({ id: userId });
    sharedData.user.fetch();

    vent.trigger('after:connect');
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

    model.trigger('request', model, options);

    socket.emit(url + ':' + method, data, function(error, data) {
      // TODO(taijinlee): figure out what cases these are and how to catch them properly
      if (error) { return options.error(error); }
      return options.success.call(model, data);
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

  var router = new Router();
  Backbone.history.start({ pushState: true });

});
