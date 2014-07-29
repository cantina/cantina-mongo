var mongojs = require('mongojs')
  , stringify = require('querystring').stringify;

module.exports = function (app) {
  var conf;

  // Default conf.
  app.conf.add({
    mongo: {
      hosts: 'localhost:27017',
      db: 'cantina'
    }
  });

  conf = app.conf.get('mongo');
  conf.url = buildConnectUrl();

  app.mongo = mongojs(conf.url);

  /**
   * Builds a MongoDB standard connection string, as defined at
   * http://docs.mongodb.org/manual/reference/connection-string/
   */
  function buildConnectUrl () {
    var url = 'mongodb://';

    if (conf.auth && conf.auth.username && conf.auth.password) {
      url += conf.auth.username + ':' + conf.auth.password + '@';
    }
    url += Array.isArray(conf.hosts) ? conf.hosts.join(',') : conf.hosts;
    url += '/' + conf.db;
    if (Object.prototype.toString.call(conf.options) === '[object Object]') {
      url += '?' + stringify(conf.options);
    }
    return url;
  }
};