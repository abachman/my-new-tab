import { useEffect } from "react"
import { useSelector } from "react-redux"
import BlocksGrid from "./BlocksGrid"
import Controls from "./Controls"
import * as Forms from "./Forms"

import "../stylesheets/bootstrap.min.css"
import "../stylesheets/bootstrap_xl.css"

import "../stylesheets/App.css"

const App = () => {
  const colorScheme = useSelector((s) => s.settings.colorScheme || 'system')

  useEffect(() => {
    document.body.classList.remove('dark-mode', 'light-mode', 'system-mode')
    document.body.classList.add(`${colorScheme}-mode`)
  }, [colorScheme])

  return (
    <div className="App container" data-testid="app-container">
      <BlocksGrid />
      <Controls />
      <Forms.Settings />
      <Forms.Blocks />
    </div>
  )
}

export default App
