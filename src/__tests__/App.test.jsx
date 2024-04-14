import React from "react"
import App from "../views/App"

import { render } from "./helpers/RenderHelper"

it("renders without crashing", () => {
  const component = render(<App />)

  expect(component.getByTestId("app-container")).toBeInTheDocument()
  expect(component.getByTestId("add-block")).toBeInTheDocument()
})
