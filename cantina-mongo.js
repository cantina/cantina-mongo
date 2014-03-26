var app = require('cantina')
  , mongodb = require('mongodb')
  , stringify = require('querystring').stringify;

app.conf.add({
  mongo: {
    hosts: 'localhost:27017',
    db: 'cantina'
  }
});

var conf = app.conf.get('mongo');
conf.url = buildConnectUrl();

app.mongo = null;

// Must use hooks as the connect method is asynchronous
app.hook('start').add(function mongoConnect (done) {
  var client = new mongodb.MongoClient();
  client.connect(conf.url, conf.options, function (err, db) {
    if (err) return done(err);
    app.mongo = db;
    app.mongo.client = client;
    done();
  });
});

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