# storage-emitter

[![](https://img.shields.io/npm/v/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)
[![](https://img.shields.io/travis/alekseykulikov/storage-emitter.svg)](https://travis-ci.org/alekseykulikov/storage-emitter)
[![](http://img.shields.io/npm/dm/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)

> Emit messages between browser tabs.

Why:

- sync in-memory state between browser tabs
- polyfill indexeddb.onversionchange event

How it works:

- tiny wrapper around `window.onstorage` event
- does not mix with another localStorage keys set events

## Installation

    npm install --save storage-emitter

## Example

```js
var Emitter = require('storage-emitter')
var emitter = new Emitter()

// listen to events from another tabs
emitter.on('my-event', function(e) {
  console.log(e) // { message: 'hello from another tab' }
})

// from another tab
emitter.emit('my-event', { message: 'hello from another tab' })
```

## API

## License

MIT
