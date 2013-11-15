
var mongo = require('mongodb');
var async = require('async');
var _ = require('underscore');
var mongoConfig = require('config').store.mongo;

var indexes = [
  { database: 'namer', collection: 'users', index: { email: 1 }, options: { unique: true }},
  { database: 'namer', collection: 'auths', index: { userId: 1, type: 1 } },
  { database: 'namer', collection: 'auths', index: { identifier: 1, type: 1 } },
  { database: 'namer', collection: 'projects', index: { userId: 1, name: 1 } },
  { database: 'namer', collection: 'collaborators', index: { projectId: 1 } },
  { database: 'namer', collection: 'collaborators', index: { userId: 1 } },
  { database: 'namer', collection: 'names', index: { projectId: 1 } },
  { database: 'namer', collection: 'projectTlds', index: { projectId: 1 } },
  { database: 'namer', collection: 'votes', index: { projectId: 1, nameId: 1 } },
  { database: 'namer', collection: 'nameTlds', index: { projectId: 1, nameId: 1 } },
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
