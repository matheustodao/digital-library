import { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import Header from '@components/Header'

import Router from './routes'
import LoggedLayout from './components/Layouts/logged'

export default function App() {
  return (
    <HashRouter>
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <Header />
            <LoggedLayout>
              <Router />
            </LoggedLayout>
        </ThemeProvider>
      </ChakraProvider>
    </HashRouter>
  )
}
