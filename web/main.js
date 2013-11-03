var config = {
  paths: {
    'backbone': 'bower_components/backbone/backbone-amd',
    'bootstrap': 'bower_components/bootstrap/bootstrap',
    'json2': 'bower_components/json2',
    'jquery': 'bower_components/jquery/jquery-1.8.3',
    'select2': 'bower_components/jquery/select2',
    // 'socket.io': '/socket.io/socket.io',
    'text': 'bower_components/require/text',
    'underscore': 'bower_components/underscore/underscore',
  },
  shim: {
    'autocomplete': ['jquery'],
    'bootstrap': ['jquery'],
    'bootstrap-editable': ['jquery', 'bootstrap'],
    'bootstrap-timepicker': ['jquery', 'bootstrap'],
    'datepicker': ['jquery'],
    'json': ['text'],
    'select2': ['jquery']
  }
};
require.config(config);

require([
  'common',
], function(common) {
  require(['init']);
});
