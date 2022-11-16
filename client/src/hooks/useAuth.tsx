import { useContext } from 'react'
import { AuthContext } from 'src/contexts/auth/AuthContext'

export default function useAuth() {
  return useContext(AuthContext)
}
