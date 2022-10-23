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
  DrawerHeader
} from '@chakra-ui/react'
import { Gear, List } from 'phosphor-react'

import whiteLogo from '@assets/images/white-logo.svg'

import { Route, Routes, Wrapper } from './styled'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useRef } from 'react'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box
      as="header"
      boxShadow="md"
      py="6"
      px="10"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <img src={whiteLogo} alt="digital library logo" />

        <Flex alignItems="center" justifyContent="space-between">
          <Wrapper>
            <Breadcrumb variant="soft-rounded" separator=" " className="menu">
              {routes.map((route) => (
                <BreadcrumbItem key={route.link}>
                  <Route
                    as={Link}
                    to={route.link}
                    active={(router.pathname === route.link) ? 'true' : 'false'}
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
