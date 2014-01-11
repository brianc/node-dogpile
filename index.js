var sliced = require('sliced')
module.exports = function(fn) {
  var calling = false
  var args = null
  var callbacks = []
  return function() {
    if(args) {
      var cb = sliced(arguments).pop()
      cb.call(cb, args)
    }
    if(calling) {
      callbacks.push(sliced(arguments).pop())
    }
    if(calling) return;
    calling = true
    fn(function() {
      args = arguments
      callbacks.forEach(function(cb) {
        cb.apply(cb, args)
      })
    })
  }
}
