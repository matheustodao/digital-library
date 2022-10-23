import { Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function LoggedLayout({ children }: IProps) {
  return (
    <Stack as="main" px="10" py="6">
      {children}
    </Stack>
  )
}
