import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter as Router } from "react-router-dom"
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { red } from "@mui/material/colors"

import App from "./components/App"
import Store from "./Store"

const emotionCache = createCache({ key: "css" })
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A700,
    },
    black: {
      main: "#000000",
    },
  },
})

const app = document.getElementById("app")
const root = ReactDOM.createRoot(app)
root.render(
  <Provider store={Store()}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </ThemeProvider>
    </CacheProvider>
  </Provider>
)
