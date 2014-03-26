describe('basic', function (){

  var app
    , mongodb = require('mongodb');

  before(function (done) {
    app = require('cantina');
    app.boot(function(err) {
      app.conf.set('mongo:db', 'test-' + idgen());
      require('../');
      if (err) return done(err);
      app.start(done);
    });
  });

  after(function (done) {
    app.mongo.dropDatabase(function () {
      app.destroy(done);
    });
  });

  it('connects', function (done) {
    assert(app.mongo);
    assert(app.mongo instanceof mongodb.Db);
    done();
  });

  it('works', function (done) {
    var collection = app.mongo.collection('apples')
      , obj = { type: 'McIntosh', tastes: 'sour', color: ['red', 'green'] };
    collection.insert(obj, function (err) {
      assert.ifError(err);
      assert(obj._id);
      assert(obj._id instanceof mongodb.ObjectID);
      collection.findOne({}, function (err, item) {
        assert.ifError(err);
        assert(item);
        assert(item._id instanceof mongodb.ObjectID);
        // Deep Equal doesn't work with MongoDB ObjectIDs :'(
        assert(item._id.equals(obj._id));
        delete item._id;
        delete obj._id;
        assert.deepEqual(item, obj);
        done();
      });
    });
  });
});
