
var crypto = require('crypto');
var tokenizer = module.exports = {};

tokenizer.generate = function(salt, tokenize, time, timeToLive) {
  return crypto.createHmac('sha256', '' + salt).update('' + tokenize).update('' + time).update('' + timeToLive).digest('base64');
};

tokenizer.match = function(salt, tokenize, time, timeToLive, token) {
  if (token === tokenizer.generate(salt, tokenize, time, timeToLive)) {
    var now = new Date().getTime();
    if (typeof time === 'string') { time = parseInt(time, 10); }
    if (typeof timeToLive === 'string') { timeToLive = parseInt(timeToLive, 10); }

    if (!timeToLive) { return true; }
    if (now < time + timeToLive) { return true; }
  }
  return false;
};

tokenizer.generateSalt = function() {
  var salt = null;
  try {
    salt = crypto.randomBytes(256).toString('base64');
  } catch (ex) {
    // handle error in other way too?
  }
  return salt;
};
