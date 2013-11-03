
var _ = require('underscore');

module.exports = var Base = function(store, database, collection) {
  this.store = store;
  this.context = {
    database: database,
    collection: collection
  };
};

_.extend(Base.prototype, {
  insert: function(obj, callback) {
    return this.store.insert(obj, this.context, callback);
  },

  retrieve: function(key, callback) {
    return this.store.retrieve(key, this.context, {}, callback);
  },

  update: function(criteria, obj, callback) {
    return this.store.update(criteria, obj, this.context, callback);
  },

  upsert: function(criteria, obj, callback) {
    return this.store.upsert(criteria, obj, this.context, callback);
  },

  destroy: function(criteria, callback) {
    return this.store.destroy(criteria, this.context, callback);
  },

  query: function(criteria, limit, skip, callback) {
    return this.store.query(criteria, this.context, { limit: limit, skip: skip }, callback);
  }
});
