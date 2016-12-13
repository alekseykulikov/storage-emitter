/* eslint-env mocha */
import { expect } from 'chai'
import sEmitter from '../src'

describe('storage-emitter', () => {
  it('has EventEmitter methods', () => {
    expect(sEmitter.on).a('function')
    expect(sEmitter.emit).a('function')
    expect(sEmitter.off).a('function')
  })

  it('emits events like regular EventEmitter', (done) => {
    const msg = { message: 'Hello world' }
    sEmitter.on('greeting', (val) => {
      expect(val).eql(msg)
      done()
    })
    sEmitter.emit('greeting', msg)
  })

  it('emits without arguments', (done) => {
    sEmitter.on('hi', (val) => {
      expect(val).undefined
      done()
    })
    sEmitter.emit('hi')
  })
})
