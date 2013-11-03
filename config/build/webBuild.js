var requirejs = require('requirejs');
var fs = require('fs');
var _ = require('underscore');
var mime = require('mime');
var wrench = require('wrench');
var config = require('config');

var async = require('async');

var AWS = require('aws-sdk');

if (config.aws.accessKeyId) {
  AWS.config.update(config.aws);
}

var exec = require('child_process').exec;

var requireConfig = {
  appDir: process.env.APP_ROOT + '/web',
  baseUrl: 'js',
  dir: process.env.APP_ROOT + '/web-build/' + process.env.GIT_REV,
  // optimize: 'none',

  paths: {
    'async': 'lib/async/async',
    'autocomplete': 'lib/jquery/jquery.autocomplete',
    'backbone': 'lib/backbone/backbone-amd',
    'backbone-web': 'lib/backbone/backbone-web',
    'bootstrap': 'lib/bootstrap/bootstrap',
    'bootstrap-editable': 'lib/bootstrap-editable/bootstrap-editable',
    'bootstrap-timepicker': 'lib/bootstrap-timepicker/bootstrap-timepicker',
    'datepicker': 'lib/datepicker/bootstrap-datepicker',
    'humanize': 'lib/humanize',
    'moment': 'lib/moment',
    'json2': 'lib/json2',
    'jquery': 'lib/jquery/jquery-1.8.3',
    'select2': 'lib/jquery/select2',
    'socket.io': 'lib/socket.io',
    'text': 'lib/require/text',
    'types': 'lib/backbone/types',
    'underscore': 'lib/underscore/underscore',
    'validator': 'lib/validator/validator-edited'
  },

  modules: [
    { name: 'common' },
    { name: 'init', exclude: ['common'] },
    { name: 'layouts/appChromed/appChromed', exclude: ['common'] },
    { name: 'layouts/landing/landing', exclude: ['common'] }
  ]
};

var routes = JSON.parse(fs.readFileSync(process.env.APP_ROOT + '/web/js/routes.json')).routes;
_.each(routes, function(route) {
  var currModuleName = 'views/' + route.view;
  var isDefined = _.find(requireConfig.modules, function(module) {
    return module.name === currModuleName;
  });
  if (isDefined) { return; }
  requireConfig.modules.push({
    name: currModuleName,
    exclude: ['common']
  });
});

async.auto({
  optimize: function(done) {
    requirejs.optimize(requireConfig, function(buildResponse) {
      console.log(buildResponse);
      return done();
    });
  },
  replaceVersion: ['optimize', function(done) {
    var s3host = '\\/' + process.env.GIT_REV;
    if (config.aws.accessKeyId) {
      s3host = 'http:\\/\\/s3-' + config.aws.region + '.amazonaws.com\\/' + config.aws.s3.bucket + '\\/' + process.env.GIT_REV;
    }

    exec('find ' + requireConfig.dir + 'layout.html -exec sed -i -e "s/\\/VERSION/' + s3host + '/g" {} \\;', function(error) {
      if (error) { return done(error); }
      console.log(requireConfig.dir + 'layout.html has /VERSION substituted with ' + s3host);
      return done();
    });
  }],
  gzip: ['optimize', function(done) {
    console.log('starting gzip...');
    exec('gzip -r -9 ' + requireConfig.dir, function(error) {
      if (error) { return done(error); }
      console.log('gzip done');
      return done();
    });
  }],
  uploadToS3: ['gzip', function(done) {
    if (!config.aws.accessKeyId) { return done(); } // do nothing if no aws set

    var s3 = new AWS.S3();
    var files = wrench.readdirSyncRecursive(requireConfig.dir);
    console.log(files);

    _.each(files, function(fileName, index) {
      var fullFilePath = requireConfig.dir + fileName;
      if (!fs.statSync(fullFilePath).isFile()) { return; }

      s3.client.putObject({
        Bucket: config.aws.s3.bucket,
        Body: fs.readFileSync(fullFilePath),
        Key: process.env.GIT_REV + '/' + fileName.replace('.gz', ''),
        ContentType: mime.lookup(fileName.replace('.gz', '')),
        ContentEncoding: 'gzip',
        // StorageClass: 'REDUCED_REDUNDANCY'
      }, function(error, data) {
        if (error) { return console.log(error); }
        console.log('uploaded ' + fileName + ' to s3');
        console.log(data);
        if (index === (files.length - 1)) {
          return done();
        }
      });
    });
  }],
  unzip: ['uploadToS3', function(done) {
    console.log('unzipping...');
    exec('gzip -d -r ' + requireConfig.dir, function(error) {
      if (error) { return done(error); }
      console.log('unzipping done');
      return done();
    });
  }]
}, function(error, result) {
  if (error) { return console.log(error); }
  console.log('finished deploying');
});
