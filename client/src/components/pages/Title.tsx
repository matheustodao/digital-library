import { Heading, useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Title({ children }: IProps) {
  const { colorMode } = useColorMode()

  return (
    <Heading
      as="h1"
      textColor={colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.800'}
      mt="10"
      mb="3"
    >
      {children}
    </Heading>
  )
}
