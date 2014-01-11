var assert = require('assert')
var dogpile = require('../')

var count = 0

var getCount = dogpile(function(cb) {
  setTimeout(function() {
    cb(null, count++)
  }, 100)
})

it('fires once', function(done) {
  var action = function(cb) {
    setTimeout(function() {
      cb(null, true)
    }, 100)
  }
  dogpile(action)(function(err, bool) {
    assert.ifError(err)
    assert.strictEqual(bool, true)
    done()
  })
})

it('works', function(done) {
  var max = 10
  var test = function(loops) {
    getCount(function(err, c) {
      assert.ifError(err)
      assert.strictEqual(c, 0)
      assert.strictEqual(count, 1)
      if(loops == max) {
        return done()
      }
    })
  }
  for(var i = 0; i <= max; i++) {
    test(i)
  }
})
