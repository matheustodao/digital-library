import { invalidCredentials } from '@infra/errors/digitalLibrary/status/400/invalidCredentials'
import { configServices } from '@services/config'
import { AuthConfigParams, AuthLoginParams } from '@type/digitalLibrary/auth'
import { createContext, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface AuthContextProps {
  configs: AuthConfigParams
  isAuthenticated: boolean
  handleSignIn: (params: AuthLoginParams) => Promise<any>
  handleSetupConfig: (params?: AuthConfigParams) => void
  handleSignOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export default function AuthProvider({ children }: any) {
  const navigate = useNavigate()
  const configsRef = useRef<AuthConfigParams>({} as AuthConfigParams)
  const isAuthenticatedRef = useRef(!configsRef.current)

  function handleSetupConfig(data?: AuthConfigParams) {
    if (!data) return

    configsRef.current = { ...configsRef.current, ...data }
  }

  async function handleSignIn(params: AuthLoginParams) {
    try {
      const data: AuthConfigParams = await configServices.login(params)
      isAuthenticatedRef.current = true

      handleSetupConfig(data)
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
  }

  const values = useMemo(() => ({
    configs: configsRef.current,
    isAuthenticated: isAuthenticatedRef.current,
    handleSignIn: async (params: AuthLoginParams) => await handleSignIn(params),
    handleSetupConfig: (params?: AuthConfigParams) => handleSetupConfig(params),
    handleSignOut: () => handleSignOut()
  }), [configsRef.current, isAuthenticatedRef.current])

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
