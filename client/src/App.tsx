import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'

import { ColorModeSwitcher } from './components/ColorModeSwitcher'

import Router from './routes'

export default function App() {
  return (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Router />
    </ChakraProvider>
  </BrowserRouter>
  )
}
