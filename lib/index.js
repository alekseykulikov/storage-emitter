var Emitter = require('component-emitter')

/**
 * Expose `StorageEmitter`.
 */

module.exports = StorageEmitter

/**
 * Communication key.
 */

var KEY = '!!storage-emitter-key'

/**
 * Cache instances for one process communication.
 */

var instances = []

/**
 * Register `storage` event listener to DefaultView<window> target.
 * https://developer.mozilla.org/en-US/docs/Web/Events/storage
 */

window.addEventListener('storage', onStorage, false)

/**
 * Initialize new `StorageEmitter`.
 */

function StorageEmitter() {
  if (!(this instanceof StorageEmitter)) return new StorageEmitter()
  instances.push(this)
}

/**
 * Inherit from `Emitter`
 */

Emitter(StorageEmitter.prototype)

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {StorageEmitter}
 */

StorageEmitter.prototype.emit = function(event) {
  var args = [].slice.call(arguments, 1)
  var newValue = JSON.stringify({ event: event, args: args })
  localStorage.setItem(KEY, newValue)
  localStorage.removeItem(KEY)
  onStorage({ key: KEY, newValue: newValue })
  return this
}

/**
 * Handle storage event.
 * https://developer.mozilla.org/en-US/docs/Web/Events/storage
 *
 * @param {StorageEvent} e { key, newValue }
 */

function onStorage(e) {
  if (e.key != KEY) return // ignore other keys
  if (!e.newValue) return // removeItem

  try {
    var cmd = JSON.parse(e.newValue)
    instances.forEach(function(emitter) {
      emitter.listeners(cmd.event).forEach(function(callback) {
        callback.apply(emitter, cmd.args)
      })
    })
  } catch(err) {
    console.error('unexpected value: ' + err.newValue)
  }
}
