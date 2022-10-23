import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import Header from '@components/Header'

import Router from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme}>
          <Header />
          <Router />
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
