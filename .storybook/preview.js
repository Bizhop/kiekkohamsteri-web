/** @type { import('@storybook/react').Preview } */

import { MemoryRouter } from "react-router-dom"
import { legacy_createStore as createStore } from "redux"
import "../src/styles/styles.css"
import { Provider } from "react-redux"

const store = createStore(state => state)

export const parameters = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  story => <Provider store={store}><MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter></Provider>
]
