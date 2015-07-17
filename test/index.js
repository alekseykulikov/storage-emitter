var expect = require('chai').expect
var inherits = require('util').inherits
var after = require('lodash.after')
var Emitter = require('../lib')

describe('storage-emitter', function() {
  it('emits events between 3 instances', function(done) {
    var e1 = new Emitter()
    var e2 = Emitter()
    var e3 = Emitter()
    var msg = { message: 'Hello world' }
    var next = after(4, function(val) {
      expect(val).eql(msg)
      done()
    })

    e2.on('greeting', next)
    e2.on('greeting', next)
    e2.on('greeting', next)
    e3.on('greeting', next)

    e1.on('greeting', function() { done('should not receive it\'s own event') })
    e1.emit('greeting', msg)
  })

  it('works similar to component-emitter', function(done) {
    function MyClass(name) {
      Emitter.call(this)
      this.name = name
    }
    inherits(MyClass, Emitter)
    MyClass.prototype.greetOthers = function() {
      this.emit('hi', 'Hello from ' + this.name)
    }

    var m1 = new MyClass('John')
    var m2 = new MyClass('Bob')

    m2.on('hi', function(val) {
      expect(val).equal('Hello from John')
      done()
    })
    m1.on('greeting', function() { done('should not receive it\'s own event') })
    m1.greetOthers()
  })
})
