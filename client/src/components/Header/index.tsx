import { Link, useLocation } from 'react-router-dom'
import { Box, Flex, BreadcrumbItem, Breadcrumb } from '@chakra-ui/react'
import whiteLogo from '@assets/images/white-logo.svg'
import { Route } from './styled'
import { Gear } from 'phosphor-react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

const routes = [
  {
    label: 'Home',
    link: '/'
  },

  {
    label: 'Livros',
    link: '/books'
  },

  {
    label: 'Empréstimos',
    link: '/loans'
  },

  {
    label: <Gear size={24} />,
    link: '/settings'
  }
]

export default function Header() {
  const router = useLocation()
  return (
    <Box
      as="header"
      boxShadow="md"
      py="10"
      px="10"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <img src={whiteLogo} alt="digital library logo" />

        <Flex alignItems="center" justifyContent="space-between">
          <Breadcrumb variant="soft-rounded" separator=" ">
            {routes.map((route) => (
              <BreadcrumbItem key={route.link}>
                <Route as={Link} to={route.link} active={router.pathname === route.link}>
                  {route.label}
                </Route>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <ColorModeSwitcher />
        </Flex>

      </Flex>
    </Box>
  )
}
