/* eslint-env browser */
import Emitter from 'component-emitter'
const emit = Emitter.prototype.emit

/**
 * Use communication `KEY` to ignore other localStorage changes.
 */

const KEY = '!!storage-emitter-key'

/**
 * Use `TEST_KEY` to detect private browsing mode
 */

const TEST_KEY = '!!storage-emitter-key-test'

/**
 * Initialize an `Emitter` instance.
 */

const sEmitter = new Emitter()

const isLocalStorageAvailable = !isPrivateBrowsingMode()

/**
* Register `storage` event listener to DefaultView<window> target.
* https://developer.mozilla.org/en-US/docs/Web/Events/storage
*
* @param {StorageEvent} e { key, newValue }
*/

window.addEventListener('storage', function onStorage (e) {
  if (e.key !== KEY) return // ignore other keys
  if (!e.newValue) return // removeItem
  try {
    const cmd = JSON.parse(e.newValue)
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
  if (isLocalStorageAvailable) {
    const cmd = JSON.stringify({ event, args })
    localStorage.setItem(KEY, cmd)
    localStorage.removeItem(KEY)
  }
  return emit.apply(this, arguments)
}

/**
 * Check browser is in private browsing mode or not
 *
 * @return {Boolean}
 */

function isPrivateBrowsingMode () {
  try {
    localStorage.setItem(TEST_KEY, '1')
    localStorage.removeItem(TEST_KEY)
    return false
  } catch (error) {
    return true
  }
}

/**
 * Expose `sEmitter`.
 */

export default sEmitter
