import Database from './database'

const DB = new Database()

export function persist(state, cb) {
  // simple persistence just plunks whole application state into storage
  DB.set({ '__my_new_tab': state }, cb)
}

function difference(a, b) {
  // all members of a not present in b
  return a.filter(v => b.indexOf(v) === -1)
}

export function hydrate(defaultState, cb) {
  // get full dump of storage
  DB.get('__my_new_tab', (existing) => {
    let state = existing['__my_new_tab']

    if (state && typeof state === 'object' && Object.keys(state).length > 0) {
      const defaults = Object.keys(defaultState)
      const given = Object.keys(state)

      const d_diff = difference(defaults, given)
      const g_diff = difference(given, defaults)

      if (g_diff.length > 0) {
        // storage contains things we no longer care about, feel free to clean up
        g_diff.forEach(stale => {
          delete state[stale]
        })
        cb(state)
      } else if (d_diff.length > 0) {
        // set defaults and go
        let newDefaults = {}

        d_diff.forEach(nd => {
          newDefaults[nd] = defaultState[nd]
        })

        cb(Object.assign({}, state, newDefaults))
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
