
module.exports = function(type, storeConfig) {

  var store;

  if (type === 'mongo') {
    store = require(process.env.APP_ROOT + '/store/mongo.js')(storeConfig);
  } else if (type === 'ram') {
    store = require(process.env.APP_ROOT + '/store/ram.js')(storeConfig);
  } else if (type === 'dynamo') {
    store = require(process.env.APP_ROOT + '/store/dynamo.js')(); // ignore host and port
  } else {
    throw new Error('Not a valid run mode');
  }

  return {
    createTable: function(tableName, options, callback) { return store.createTable.apply(store, arguments); },

    insert: function(obj, context, callback) { return store.insert.apply(store, arguments); },
    retrieve: function(key, context, options, callback) { return store.retrieve.apply(store, arguments); },
    update: function(criteria, obj, context, callback) { return store.update.apply(store, arguments); },
    upsert: function(criteria, obj, context, callback) { return store.upsert.apply(store, arguments); },
    destroy: function(criteria, context, callback) { return store.destroy.apply(store, arguments); },
    query: function(criteria, context, options, callback) { return store.query.apply(store, arguments); },

    generateId: function() { return store.generateId.apply(store, arguments); },
    idEncode: function(encodedId) { return store.idEncode.apply(store, arguments); },
    idDecode: function(id) { return store.idDecode.apply(store, arguments); }
  };

};
