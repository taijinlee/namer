
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var _ = require('underscore');
var mongoConfig = require('config').store.mongo;

var indexes = [
  /*
  { database: 'wedding', collection: 'users', index: { email: 1 }, options: { unique: true }},
  { database: 'wedding', collection: 'weddings', index: { userId: 1 } },
  { database: 'wedding', collection: 'partys', index: { weddingId: 1 } },
  { database: 'wedding', collection: 'contacts', index: { userId: 1 } },
  */
];

var mongoServer = new mongo.Server(mongoConfig.host, mongoConfig.port);
var conn = new mongo.Db('main' /* default db */, mongoServer);

conn.open(function(error, client) {

  var createIndex = function(database, collection, index, options) {
    return function(callback) {
      conn = conn.db(database);
      conn.collection(collection).ensureIndex(index, options, callback);
    };
  };
  var createIndexes = _.map(indexes, function(config) {
    return createIndex(config.database, config.collection, config.index, config.options);
  });

  async.series(
    createIndexes,
    function() {
      conn.close();
    }
  );

});
