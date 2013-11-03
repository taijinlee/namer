var config = {
  paths: {
    'backbone': 'lib/backbone/backbone-amd',
    'bootstrap': 'lib/bootstrap/bootstrap',
    'json2': 'lib/json2',
    'jquery': 'lib/jquery/jquery-1.8.3',
    'select2': 'lib/jquery/select2',
    // 'socket.io': '/socket.io/socket.io',
    'text': 'lib/require/text',
    'underscore': 'lib/underscore/underscore',
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
