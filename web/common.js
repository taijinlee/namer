define([
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

  window.socket = io.connect();
  window.socket.socket.on('error', function (reason) {
    $.removeCookie('_namer_token');
    console.error('Unable to connect Socket.IO', reason);
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
      if (error) {
        options.error();
      } else {
        succes();
      }
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

    console.log('yooo');
    console.log(method, model, options);
*/
  };

});
