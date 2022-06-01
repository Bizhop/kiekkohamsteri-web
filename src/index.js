import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter as Router } from "react-router-dom"

import App from "./components/App"
import Store from "./Store"

const app = document.getElementById("app")
const root = ReactDOM.createRoot(app)
root.render(
  <Provider store={Store()}>
    <Router>
      <App />
    </Router>
  </Provider>
)
