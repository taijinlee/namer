
var mongo = require('mongodb');
var async = require('async');
var _ = require('underscore');
var mongoConfig = require('config').store.mongo;

var indexes = [
  { database: 'namer', collection: 'users', index: { email: 1 }, options: { unique: true }},
  { database: 'namer', collection: 'authType', index: { userId: 1, type: 1 } },
  { database: 'namer', collection: 'projects', index: { userId: 1 } },
  { database: 'namer', collection: 'collaborators', index: { projectId: 1 } },
  { database: 'namer', collection: 'collaborators', index: { userId: 1 } },
];

mongo.MongoClient.connect('mongodb://' + mongoConfig.host, function(error, db) {
  async.series(
    _.map(indexes, function(config) {
      return function(done) {
        var targetDb = db.db(config.database);
        targetDb.collection(config.collection).ensureIndex(config.index, config.options, done);
      };
    }), function() {
      db.close();
    }
  );
});
