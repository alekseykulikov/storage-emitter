# storage-emitter

[![](https://img.shields.io/npm/v/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)
[![](https://img.shields.io/travis/alekseykulikov/storage-emitter.svg)](https://travis-ci.org/alekseykulikov/storage-emitter)
[![](http://img.shields.io/npm/dm/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)

> Emit events between browser tabs.

It works like a regular instance of [EventEmitter](https://github.com/component/emitter),
with the only difference that event is fired in all open tabs (even with different urls, but the same domain).

It's a tiny wrapper around
[`window.onstorage`](http://www.w3.org/TR/webstorage/#the-storage-event) event,
which is a part of WebStorage specification and available in IE8+ browsers.

Possible applications:

- perform **logout** in all open tabs
- sync in-memory objects between browser tabs, like [swarm.js](https://github.com/gritzko/swarm#storages)
- polyfill indexeddb.onversionchange event in [Safari](https://bugs.webkit.org/show_bug.cgi?id=136155)

## Installation

    npm install --save storage-emitter

## Example

```js
var sEmitter = require('storage-emitter') // or window.sEmitter

// listen to "logout" event

sEmitter.on('logout', function(e) {
  console.log(e) // { message: 'hello from another tab' }
})

// call it from another tab

sEmitter.emit('logout', { message: 'hello from another tab' })
```

## API

### sEmitter.on(event, callback)

Subscribe on `event` across all open application instances.

### sEmitter.emit(event, args)

Emit `event` with `args` to all open tabs.

### sEmitter.off([event])

Unsubscribe from all events or one specific `event`.

## License

[MIT]('./LICENSE')
