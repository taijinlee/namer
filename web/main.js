var config = {
  paths: {
    'backbone': 'bower_components/backbone-amd/backbone',
    // 'bootstrap': 'bower_components/bootstrap/bootstrap',
    'json2': 'bower_components/json2/json2',
    'jquery': 'bower_components/jquery/jquery',
    'select2': 'bower_components/select2/select2',
    'text': 'bower_components/requirejs-text/text',
    'underscore': 'bower_components/underscore-amd/underscore',
  },
  shim: {
    'backbone': ['jquery', 'underscore'],
    'select2': ['jquery']
  }
};
require.config(config);

require([
  'common',
], function(common) {
  require(['init']);
});
