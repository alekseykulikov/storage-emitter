/* eslint-env browser */
import Emitter from 'component-emitter'
const emit = Emitter.prototype.emit

/**
 * Use communication `KEY` to ignore other localStorage changes.
 */

const KEY = '!!storage-emitter-key'

/**
 * Initialize an `Emitter` instance.
 */

const sEmitter = new Emitter()

/**
* Register `storage` event listener to DefaultView<window> target.
* https://developer.mozilla.org/en-US/docs/Web/Events/storage
*
* @param {StorageEvent} e { key, newValue }
*/

global.addEventListener('storage', function onStorage (e) {
  if (e.key !== KEY) return // ignore other keys
  if (!e.newValue) return // removeItem
  try {
    var cmd = JSON.parse(e.newValue)
    sEmitter.listeners(cmd.event).forEach((callback) => {
      callback.call(sEmitter, cmd.args)
    })
  } catch (err) {
    console.error('unexpected value: ' + err.newValue)
  }
}, false)

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} args
 * @return {StorageEmitter}
 */

sEmitter.emit = function (event, args) {
  var cmd = JSON.stringify({ event: event, args: args })
  localStorage.setItem(KEY, cmd)
  localStorage.removeItem(KEY)
  return emit.apply(this, arguments)
}

/**
 * Expose `sEmitter`.
 */

export default sEmitter
