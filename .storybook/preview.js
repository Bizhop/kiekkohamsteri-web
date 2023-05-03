/** @type { import('@storybook/react').Preview } */

import { MemoryRouter } from "react-router-dom"

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
  story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
]
