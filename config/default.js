module.exports = {
  app: {
    port: 4000,
    host: 'localhost:4000'
  },

  auth: {
    salt: ""
  },

  store: {
    mongo: {
      host: 'localhost',
      port: 27017,
      maxMillisOnWarn: 5000
    }
  }
};
