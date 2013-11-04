
var _ = require('underscore');

module.exports = var Base = function(store, context, schema) {
  if (!context.database || !context.collection) {
    throw new Error('model requires database and collection');
  }
  this.store = store;
  this.context = context;
  this.schema = schema;
  this.schemaKeys = _.keys(this.schema);
};

_.extend(Base.prototype, {
  insert: function(obj, callback) {
    if (!this._verifySchema(obj)) { return callback(this._schemaInvalidError); }
    return this.store.insert(this._sanitize(obj), this.context, callback);
  },

  retrieve: function(key, callback) {
    return this.store.retrieve(this._sanitize(key), this.context, {}, callback);
  },

  update: function(criteria, obj, callback) {
    if (!this._verifySchema(obj)) { return callback(this._schemaInvalidError); }
    return this.store.update(criteria, this._sanitize(obj), this.context, callback);
  },

  upsert: function(criteria, obj, callback) {
    if (!this._verifySchema(obj)) { return callback(this._schemaInvalidError); }
    return this.store.upsert(criteria, this._sanitize(obj), this.context, callback);
  },

  destroy: function(criteria, callback) {
    return this.store.destroy(criteria, this.context, callback);
  },

  query: function(criteria, limit, skip, callback) {
    return this.store.query(criteria, this.context, { limit: limit, skip: skip }, callback);
  },

  _verifySchema: function(obj) {
    // TODO: hack here. for getting it out, i only need to verify everything exists.
    // in future, use node-validator to actually make sure it's the correct type
    return _.every(this.schemaKeys, function(schemaKey) {
      var value = obj[schemaKey];
      if (value === undefined || value === null) { return false; }
      return true;
    });
  },

  _sanitize: function(obj) {
o    return _.pick(obj, this.schemaKeys);
  },

  _schemaInvalidError: new Error('schema invalid')
});
