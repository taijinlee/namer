module.exports = {
  app: {
    port: 4000,
    host: 'localhost:4000'
  },

  auth: {
    ttl: 86400000 * 365, // 1 year
    salt: 'cool'
  },

  store: {
    mongo: {
      host: 'localhost',
      port: 27017,
      maxMillisOnWarn: 5000
    }
  }
};
