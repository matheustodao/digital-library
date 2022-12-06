import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Flex,
  BreadcrumbItem,
  Breadcrumb,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerCloseButton,
  DrawerHeader,
  IconButton
} from '@chakra-ui/react'
import { Gear, List, SignOut } from 'phosphor-react'

import { Route, Routes, Wrapper } from './styled'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useRef } from 'react'
import Logo from '@components/Logo'
import useAuth from 'src/hooks/useAuth'

const routes = [
  {
    label: 'Home',
    link: '/home'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const { handleSignOut } = useAuth()

  return (
    <Box
      as="header"
      boxShadow="md"
      py="6"
      px="10"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Logo variant="no-details" size="sm" />

        <Flex alignItems="center" justifyContent="space-between">
          <Wrapper>
            <Breadcrumb variant="soft-rounded" separator=" " className="menu">
              {routes.map((route) => (
                <BreadcrumbItem key={route.link}>
                  <Route
                    as={Link}
                    to={route.link}
                    active={(router.pathname.startsWith(route.link)) ? 'true' : 'false'}
                  >
                    {route.label}
                  </Route>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
            <button className="hamburger" onClick={onOpen}>
              <List size={24} />
            </button>
          </Wrapper>
          <ColorModeSwitcher />
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={handleSignOut}
            icon={<SignOut />}
            aria-label="Logout"
          />
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="xs"
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Flex>
              <Routes>
                {routes.map((route) => (
                  <li key={route.link}>
                    <Route
                      as={Link}
                      to={route.link}
                      active={(router.pathname === route.link) ? 'true' : 'false'}
                    >
                      {route.label}
                    </Route>
                  </li>
                ))}
              </Routes>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
