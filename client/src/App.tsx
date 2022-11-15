import { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import Router from './routes'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <HashRouter>
      <ToastContainer
        theme="colored"
        autoClose={2000}
      />
      <ChakraProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ChakraProvider>
    </HashRouter>
  )
}
