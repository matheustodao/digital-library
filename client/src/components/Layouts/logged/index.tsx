import { Stack } from '@chakra-ui/react'
import Header from '@components/Header'
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

export default function LoggedLayout({ children }: IProps) {
  return (
    <Stack as="main" px="10" py="6">
      <Header />
      <Outlet />
      {children}
    </Stack>
  )
}
