import { useEffect } from "react"
import { useSelector } from "react-redux"
import BlocksGrid from "./BlocksGrid"
import Controls from "./Controls"
import * as Forms from "./Forms"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../stylesheets/bootstrap_xl.css"

import "../stylesheets/App.css"
import { useColorScheme } from "hooks/useColorScheme"

const App = () => {
  const colorScheme = useSelector((s) => s.settings.colorScheme || "system")
  const lightDark = useColorScheme()

  useEffect(() => {
    document.body.classList.remove("dark-mode", "light-mode", "system-mode")
    document.body.classList.add(`${colorScheme}-mode`)
    document.body.dataset.bsTheme = lightDark
  }, [colorScheme, lightDark])

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
