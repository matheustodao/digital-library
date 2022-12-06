import { Heading, HeadingProps, useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps extends HeadingProps {
  children: ReactNode
}

export default function Title({ children, ...props }: IProps) {
  const { colorMode } = useColorMode()

  return (
    <Heading
      as="h1"
      textColor={colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.800'}
      mt="10"
      mb="3"
      {...props}
    >
      {children}
    </Heading>
  )
}
