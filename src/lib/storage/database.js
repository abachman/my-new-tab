// if we're in an extension, return that
function StorageArea() {
  const chrome = window.chrome
  if (chrome && chrome.storage && chrome.storage.local) {
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

        let returns = {}
        returns[key] = item

        return cb(returns)

      default:
        console.error('[Database get] unknown engine')
        return cb(null)
    }
  }

  // `items` must be an object with string keys
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
