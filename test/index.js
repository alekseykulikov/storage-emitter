var expect = require('chai').expect
var sEmitter = require('../lib')

describe('storage-emitter', function() {
  it('has EventEmitter methods', function() {
    expect(sEmitter.on).a('function')
    expect(sEmitter.emit).a('function')
    expect(sEmitter.off).a('function')
  })

  it('emits events like regular EventEmitter', function(done) {
    var msg = { message: 'Hello world' }
    sEmitter.on('greeting', function(val) {
      expect(val).eql(msg)
      done()
    })
    sEmitter.emit('greeting', msg)
  })
})
