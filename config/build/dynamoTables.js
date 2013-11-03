module.exports = (function() {

  var store = require(process.env.APP_ROOT + '/store/store.js')('dynamo');

  var timeout = 0;
  var staggeredCreateTable = function() {
    timeout += 1000;
    var args = Array.prototype.slice.call(arguments);
    args.unshift(timeout);
    args.unshift(store.createTable);
    setTimeout.apply(null, args);
  };

  staggeredCreateTable('history', { read: 5, write: 5, hash: { id: String }}, console.log);

  staggeredCreateTable('users', { read: 5, write: 5, hash: { id: String }}, console.log);
  staggeredCreateTable('usersEmailIdMap', { read: 5, write: 5, hash: { email: String }}, console.log);
  staggeredCreateTable('drinks', { read: 5, write: 5, hash: { id: String }}, console.log);

  staggeredCreateTable('checkins', { read: 5, write: 5, hash: { userId: String }, range: { drinkId: String }}, console.log);
  staggeredCreateTable('checkinIdIndex', { read: 5, write: 5, hash: { id: String }}, console.log);

  staggeredCreateTable('ratings', { read: 5, write: 5, hash: { userId: String }, range: { drinkId: String }}, console.log);
  staggeredCreateTable('ratingIdIndex', { read: 5, write: 5, hash: { id: String }}, console.log);

  staggeredCreateTable('userActivity', { read: 5, write: 5, hash: { userId: String }, range: { created: Number }}, console.log);
  staggeredCreateTable('drinkActivity', { read: 5, write: 5, hash: { drinkId: String }, range: { created: Number }}, console.log);

  staggeredCreateTable('relationships', { read: 5, write: 5, hash: { userId1: String }, range: { userId2: String }}, console.log);

  staggeredCreateTable('drinkLists', { read: 5, write: 5, hash: { userId: String }, range: { id: String }}, console.log);
  staggeredCreateTable('drinkListItems', { read: 5, write: 5, hash: { drinkListId: String }, range: { drinkId: String }}, console.log);

  staggeredCreateTable('drinkChangeQueue', { read: 5, write: 5, hash: { id: String }}, console.log);

  staggeredCreateTable('assets', { read: 5, write: 5, hash: { id: String }}, console.log);

}());
