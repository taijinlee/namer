
module.exports = var Model = function(store, database, collection) {
  this.store = store;
  this.context = {
    database: database,
    collection: collection
  };
};

Model.prototype.insert = function(obj, callback) {
  return this.store.insert(obj, this.context, callback);
};

Model.prototype.retrieve = function(key, callback) {
  return this.store.retrieve(key, this.context, {}, callback);
};

Model.prototype.update = function(criteria, obj, callback) {
  return this.store.update(criteria, obj, this.context, callback);
};

Model.prototype.upsert = function(criteria, obj, callback) {
  return this.store.upsert(criteria, obj, this.context, callback);
};

Model.prototype.destroy = function(criteria, callback) {
  return this.store.destroy(criteria, this.context, callback);
};

Model.prototype.query = function(criteria, limit, skip, callback) {
  return this.store.query(criteria, this.context, { limit: limit, skip: skip }, callback);
};
