import { createGlobalStyle } from 'styled-components'

import { colors, typography } from 'Styles'

export const Global = createGlobalStyle`
body {
  background: ${colors.background};
  color: ${colors.primaryText};
  font-family: ${typography.bodyText}
}

a {
  color: ${colors.link}
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${typography.headerText};
  color: ${colors.headerText};
}
`
