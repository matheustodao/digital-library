import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'src/hooks/useAuth'

interface IProps {
  redirect?: string | null
  children?: ReactElement | null
}

export function ProtectedRoute({ redirect, children }: IProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={redirect ?? '/login'} replace />
  }

  return !children ? <Outlet /> : children
}

ProtectedRoute.defaultProps = {
  redirect: null,
  children: null
}
