describe('basic', function (){

  var app
    , mongojs = require('mongojs');

  before(function (done) {
    app = require('cantina').createApp();
    app.boot(function(err) {
      app.conf.set('mongo:db', 'cantina-mongo-test-' + idgen());
      app.require('../');
      done(err);
    });
  });

  after(function (done) {
    app.mongo.dropDatabase(function () {
      app.destroy(done);
    });
  });

  it('connects', function (done) {
    assert(app.mongo);
    done();
  });

  it('works', function (done) {
    var collection = app.mongo.collection('apples')
      , obj = { type: 'McIntosh', tastes: 'sour', color: ['red', 'green'] };
    collection.insert(obj, function (err) {
      assert.ifError(err);
      assert(obj._id);
      assert(obj._id instanceof mongojs.ObjectId);
      collection.find({}).limit(1).toArray(function (err, results) {
        assert.ifError(err);
        var item = results.pop();
        assert(item);
        assert(item._id instanceof mongojs.ObjectId);
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
