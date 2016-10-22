
//
//  root.Database = function () {
//    this.get = function (key) {
//      var item = localStorage.getItem(key)
//      try {
//        item = JSON.parse(item)
//      } catch (ex) {
//        console.error('[Database] failed to get item with key', key)
//        console.error(ex)
//        item = null
//      }
//      return item
//    }
//
//    this.set = function (key, value) {
//      localStorage.setItem(key, JSON.stringify(value))
//      return value
//    }
//  }
//
//  // A persistent js object
//  DatabaseObject = function (key) {
//    this._key = key
//    this._db = new Database();
//    this._store = this._db.get(key) || {}
//  }
//
//  DatabaseObject.prototype._sync = function () {
//    this._db.set(this._key, this._store)
//  }
//
//  DatabaseObject.prototype.toJSON = function () {
//    return _.clone(this._store)
//  }
//
//  DatabaseObject.prototype.get = function (key) {
//    return this._store[key]
//  }
//
//  DatabaseObject.prototype.set = function (key, value) {
//    this._store[key] = value
//    this._sync()
//  }
//
//  DatabaseObject.prototype.remove = function (key) {
//    delete this._store[key]
//    this._sync()
//  }
//
//  // make sure everyone loading an object gets the same instance
//  var db_object_cache = {}
//  root.GetDatabaseObject = function (key) {
//    if (!db_object_cache.hasOwnProperty(key)) {
//      db_object_cache[key] = new DatabaseObject(key)
//    }
//    return db_object_cache[key]
//  }
//
//  // A single JSON object keyed with ID
//  root.DatabaseSet = function (key) {
//    this._key = key;
//    this._db = new Database();
//    this._store = this._db.get(key) || {}
//  }
//
//  DatabaseSet.prototype._sync = function () {
//    this._db.set(this._key, this._store)
//  }
//
//  DatabaseSet.prototype.all = function () {
//    return _.values(this._store)
//  }
//
//  DatabaseSet.prototype.each = function (callback) {
//    _.each(this.all(), callback)
//  }
//
//  DatabaseSet.prototype.create = function (item, safe) {
//    if (safe) {
//      var found = _.findWhere(_.values(this._store), item)
//      if (found) {
//        return found;
//      }
//    }
//
//    item.id = newID()
//    this._store[item.id] = item
//    this._sync()
//    return item
//  }
//
//  DatabaseSet.prototype.find = function (id) {
//    return this._store[id]
//  }
//
//  DatabaseSet.prototype.where = function (attrs) {
//    var found = _.findWhere(_.values(this._store), item)
//    if (found) {
//      return found;
//    }
//    return null;
//  }
//
//  DatabaseSet.prototype.exists = function (item) {
//    return !!_.findWhere(_.values(this._store), item)
//  }
//
//  DatabaseSet.prototype.update = function (id, attributes) {
//    var existing = this.find(id)
//
//    if (existing) {
//      this._store[id] = _.extend(existing, attributes)
//      this._sync()
//      return existing
//    } else {
//      return null
//    }
//  }
//
//  DatabaseSet.prototype.remove = function (id) {
//    var existing = this.find(id)
//
//    if (existing) {
//      delete this._store[id]
//      this._sync()
//      return true
//    } else {
//      return false
//    }
//  }
//
//  DatabaseSet.prototype.count = function () {
//    return _.keys(this._store).length
//  }

import Database from './database'

const DB = new Database()

export function persist(state, cb) {
  // simple persistence just plunks whole application state into storage
  console.log("PERSIST", state)
  DB.set(state, cb)
}

function difference(a, b) {
  // all members of a not present in b
  return a.filter(v => b.indexOf(v) === -1)
}

export function hydrate(defaultState, cb) {
  // get full dump of storage
  DB.dump((state) => {

    if (state && typeof state === 'object') {

      const defaults = Object.keys(defaultState)
      const given = Object.keys(state)

      const d_diff = difference(defaults, given)
      const g_diff = difference(given, defaults)

      if (g_diff.length > 0) {
        console.error("stored state includes keys not present in default schema:", g_diff)

        // storage contains things we no longer care about, feel free to clean up
        g_diff.forEach(stale => {
          delete state[stale]
        })

        cb(state)
      } else if (d_diff.length > 0) {
        console.error("default schema includes keys not present in stored state:", d_diff)
        // set defaults and go
        cb(Object.assign({}, state, defaultState))
      } else {
        // state is safe, go for it
        cb(state)
      }

    } else {

      // state is null or false, store default and use
      persist(defaultState, () => {
        cb(defaultState)
      })

    }

  })
}
