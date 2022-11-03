import { Box } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { Route, WrapperRoutes } from './styled'

const routes = [
  {
    label: 'Conta',
    link: '/settings'
  },

  {
    label: 'Backup',
    link: 'backup'
  },

  {
    label: 'Exportar',
    link: 'export'
  },

  {
    label: 'Importar',
    link: 'import'
  }
]

export default function SettingNavigation() {
  const router = useLocation()
  const currentSubPath = router.pathname

  return (
    <Box
      as="aside"
      position="sticky"
      top={0}
    >
      <Box as="nav">
        <WrapperRoutes>
          {routes.map((route) => (
            <li key={route.link}>
              <Route
                to={route.link}
                active={(
                  currentSubPath === `/settings/${route.link}` || currentSubPath === route.link)
                  ? 'true'
                  : 'false'}
              >
                {route.label}
              </Route>
            </li>
          ))}
        </WrapperRoutes>
      </Box>
    </Box>
  )
}
