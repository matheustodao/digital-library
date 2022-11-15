import { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import Router from './routes'

export default function App() {
  return (
    <HashRouter>
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ChakraProvider>
    </HashRouter>
  )
}
