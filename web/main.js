var config = {
  paths: {
    'backbone': 'bower_components/backbone-amd/backbone',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'json2': 'bower_components/json2/json2',
    'jquery': 'bower_components/jquery/jquery',
    'jquery-cookie': 'bower_components/jquery-cookie/jquery.cookie',
    'select2': 'bower_components/select2/select2',

    // TODO(taijinlee): fix this on the server side so that socket.io can support VERSION as well
    'socketio': '/socket.io/socket.io',

    'text': 'bower_components/requirejs-text/text',
    'underscore': 'bower_components/underscore-amd/underscore',
  },
  shim: {
    'backbone': ['jquery', 'underscore'],
    'bootstrap': ['jquery'],
    'jquery-cookie': ['jquery'],
    'select2': ['jquery']
  }
};
require.config(config);

require([
  'common',
], function(common) {
  require(['init']);
});
