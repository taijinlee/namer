var config = {
  paths: {
    'async': 'bower_components/async/lib/async',
    'backbone': 'bower_components/backbone-amd/backbone',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'json2': 'bower_components/json2/json2',
    "jsx": "bower_components/require-jsx/jsx",
    'JSXTransformer': 'bower_components/react/JSXTransformer',
    'jquery': 'bower_components/jquery/jquery',
    'jquery-cookie': 'bower_components/jquery-cookie/jquery.cookie',
    'react': 'bower_components/react/react',
    'select2': 'bower_components/select2/select2',

    // TODO(taijinlee): fix this on the server side so that socket.io can support VERSION as well
    'socketio': '/socket.io/socket.io',

    'underscore': 'bower_components/underscore-amd/underscore',
    'vent': 'lib/vent'
  },
  shim: {
    'backbone': ['jquery', 'underscore'],
    'bootstrap': ['jquery'],
    'jquery-cookie': ['jquery'],
    "JSXTransformer": { exports: "JSXTransformer" },
    'select2': ['jquery']
  }
};
require.config(config);

require([
  'common'
], function(common) {
  require(['init']);
});
