var assert = require('assert')
var dogpile = require('../')

var count = 0

var getCount = dogpile(function(cb) {
  setTimeout(function() {
    cb(null, count++)
  }, 100)
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
