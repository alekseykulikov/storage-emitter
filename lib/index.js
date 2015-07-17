var Emitter = require('component-emitter')
var emit = Emitter.prototype.emit

/**
 * Use communication `KEY` to ignore other localStorage changes.
 */

var KEY = '!!storage-emitter-key'

/**
 * Initialize an `Emitter` instance.
 */

var sEmitter = new Emitter()

/**
* Register `storage` event listener to DefaultView<window> target.
* https://developer.mozilla.org/en-US/docs/Web/Events/storage
*
* @param {StorageEvent} e { key, newValue }
*/

global.addEventListener('storage', function onStorage(e) {
  if (e.key != KEY) return // ignore other keys
  if (!e.newValue) return // removeItem
  try {
    var cmd = JSON.parse(e.newValue)
    sEmitter.listeners(cmd.event).forEach(function(callback) {
      callback.apply(sEmitter, cmd.args)
    })
  } catch(err) {
    console.error('unexpected value: ' + err.newValue)
  }
}, false)

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {StorageEmitter}
 */

sEmitter.emit = function(event) {
  var args = [].slice.call(arguments, 1)
  var cmd = JSON.stringify({ event: event, args: args })
  localStorage.setItem(KEY, cmd)
  localStorage.removeItem(KEY)
  return emit.apply(this, arguments)
}

/**
 * Expose `sEmitter`.
 */

module.exports = sEmitter
