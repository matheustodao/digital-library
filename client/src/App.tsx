import { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import Router from './routes'

import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './contexts/auth/AuthContext'

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastContainer
          theme="light"
          autoClose={2000}
          closeOnClick
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          newestOnTop
        />
        <ChakraProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </ChakraProvider>
      </AuthProvider>
    </HashRouter>
  )
}
