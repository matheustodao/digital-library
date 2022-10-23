import 'styled-components'
import { theme } from '@chakra-ui/react'

declare module 'styled-components' {
  type LightThemeType = typeof theme
  export interface DefaultTheme extends LightThemeType { }
}
