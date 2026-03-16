import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

import App from "./views/App"
import "./index.css"
import { initStore } from "store"

initStore((store) => {
  const root = createRoot(document.getElementById("root"))
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
