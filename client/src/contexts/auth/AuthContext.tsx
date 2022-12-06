import { createContext, ReactNode, useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { configServices } from '@services/config'

import { invalidCredentials } from '@infra/errors/digitalLibrary/status/400/invalidCredentials'
import { AuthConfigParams, AuthLoginParams } from '@type/auth'

interface AuthContextProps {
  configs: AuthConfigParams
  isAuthenticated: boolean
  handleSignIn: (params: AuthLoginParams) => Promise<any>
  handleSetupConfig: (params?: AuthConfigParams) => void
  handleSignOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const configsRef = useRef<AuthConfigParams>({} as AuthConfigParams)
  const isAuthenticatedRef = useRef(!configsRef.current)

  function setupConfig(data?: AuthConfigParams) {
    if (!data) return

    isAuthenticatedRef.current = true
    configsRef.current = { ...configsRef.current, ...data }
  }

  function handleSetupConfig(data?: AuthConfigParams) {
    if (!data) return

    setupConfig(data)
    sessionStorage.setItem('@auth', JSON.stringify(data))
  }

  function persistLogin(authConfig?: AuthConfigParams) {
    if (authConfig) {
      sessionStorage.setItem('@auth', JSON.stringify(authConfig))
      setupConfig(authConfig)
      return
    }
    const hasLoginSaved = sessionStorage.getItem('@auth')

    setupConfig(JSON.parse(hasLoginSaved as string))
    navigate(location.pathname)
  }

  async function handleSignIn(params: AuthLoginParams) {
    try {
      const data: AuthConfigParams = await configServices.login(params)

      persistLogin(data)
      navigate('/home', { replace: true })
      toast.success('Login realizado com sucesso', { position: 'bottom-center' })
    } catch (err) {
      if (err instanceof Error) {
        invalidCredentials(err)
      }
    }
  }

  function handleSignOut() {
    configsRef.current = {} as never
    navigate('/login', { replace: true })
    isAuthenticatedRef.current = false
    sessionStorage.removeItem('@auth')
  }

  const values = useMemo(() => ({
    configs: configsRef.current,
    isAuthenticated: isAuthenticatedRef.current,
    handleSignIn: async (params: AuthLoginParams) => await handleSignIn(params),
    handleSetupConfig: (params?: AuthConfigParams) => handleSetupConfig(params),
    handleSignOut: () => handleSignOut()
  }), [configsRef.current, isAuthenticatedRef.current])

  useEffect(() => {
    persistLogin()
  }, [])

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
