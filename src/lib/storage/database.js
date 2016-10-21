function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
}

// a unique enough ID
function _newID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4()).toLowerCase();
}

// if we're in an extension, return that
function StorageArea() {
  const chrome = window.chrome
  if (chrome && chrome.storage && chrome.storage.local) {
    console.log('[StorageArea chrome]')
    return {
      mode: 'chrome',
      engine: chrome.storage.local
    }
  } else {
    return {
      mode: 'local',
      engine: window.localStorage
    }
  }
}

// a thin wrapper on storage, make localStorage look kind of like chrome.storage.local
class Database {
  constructor() {
    this.storage = StorageArea()
  }

  dump(cb) {
    switch (this.storage.mode) {
      case 'chrome':
        // easy!
        return this.storage.engine.get(null, cb)

      case 'local':
        let dumpOut = null

        for (let i=0; i < this.storage.engine.length; i++ ) {
          // dumpOut should remain null unless records exist
          dumpOut = dumpOut || {}

          const sKey = this.storage.engine.key(i);
          var item = this.storage.engine.getItem(sKey)

          console.log("[Database dump] iter", i, "got key", sKey, "val", item)

          try {
            item = JSON.parse(item)
          } catch (ex) {
            console.error('[Database get] failed to get item with key', sKey)
            console.error(ex)
            item = null
          }

          dumpOut[sKey] = item
        }

        return cb(dumpOut)

      default:
        console.error('[Database get] unknown engine')
        return cb(null)
    }
  }

  // takes a key and a callback, callback should expect the result of the get() operation
  get(key, cb) {
    switch (this.storage.mode) {
      case 'chrome':
        return this.storage.engine.get(key, cb)

      case 'local':
        const sKey = key.toString()
        var item = this.storage.engine.getItem(sKey)
        try {
          item = JSON.parse(item)
        } catch (ex) {
          console.error('[Database get] failed to get item with key', sKey)
          console.error(ex)
          item = null
        }
        return cb(item)

      default:
        console.error('[Database get] unknown engine')
        return cb(null)
    }
  }

  // items must be an object with
  set(items, cb) {
    if (typeof cb === 'undefined')
      cb = () => (null)

    switch (this.storage.mode) {
      case 'chrome':
        // simple!
        return this.storage.engine.set(items, cb)
      case 'local':
        // complicated!
        //
        // localStorage works like this: storage.setItem(keyName, keyValue);
        //
        // We have to iterate through items' keys and set each as a value
        // that's been passed through JSON.stringify.
        if (typeof items !== 'object' || Array.isArray(items)) {
          console.error("[Database set] when using Database.set(items, callback), items must be an object. Got:", items)
          return cb(null)
        } else {
          Object.entries(items).forEach((kv) => {
            const key = kv[0],
                  value = kv[1];

            this.storage.engine.setItem(key.toString(), JSON.stringify(value))
          })
          return cb(null)
        }
      default:
        console.error('[Database set] unknown engine')
        return cb(null)
    }
  }
}

export default Database
