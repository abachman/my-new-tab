import Database from './database'

const DB = new Database()

export function persist(state, cb) {
  // simple persistence just plunks whole application state into storage
  // console.log("PERSIST", state)
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
