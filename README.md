# storage-emitter

[![](https://img.shields.io/npm/v/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)
[![](https://img.shields.io/travis/alekseykulikov/storage-emitter.svg)](https://travis-ci.org/alekseykulikov/storage-emitter)
[![](http://img.shields.io/npm/dm/storage-emitter.svg)](https://npmjs.org/package/storage-emitter)

> Emit events between browser tabs.

It's a small wrapper around
[`window.onstorage`](http://www.w3.org/TR/webstorage/#the-storage-event) event,
which is a part of WebStorage specification and available in IE8+ browsers.

It works like a regular instance of [EventEmitter](https://github.com/component/emitter),
with the only difference that event is fired in all open tabs for same domain.

Possible applications:

- perform **logout** in all open tabs
- sync in-memory objects between browser tabs, like [swarm.js](https://github.com/gritzko/swarm#storages)
- polyfill `indexeddb.onversionchange` event in [Safari](https://bugs.webkit.org/show_bug.cgi?id=136155)

## Example

```js
import sEmitter from 'storage-emitter'

// listen to "logout" event

sEmitter.on('logout', () =>
  location.reload()
})

// call "logout" from another tab

sEmitter.emit('logout')
```

## Installation

    $ yarn add storage-emitter
    $ npm i -S storage-emitter

## API

### sEmitter.on(event, callback)

Subscribe on `event` across all open application instances.

### sEmitter.emit(event, args)

Emit `event` with `args` to all open tabs.

### sEmitter.off([event])

Unsubscribe from all events or one specific `event`.

## License

[MIT]('./LICENSE')
