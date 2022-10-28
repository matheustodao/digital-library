import { Heading, HeadingProps, Stack, StackProps, Text as ChakraText, TextProps, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ChildrenProp {
  children: ReactNode
}

type IContainerProps = ChildrenProp & StackProps
type ITitleProps = ChildrenProp & HeadingProps
type ITextProps = ChildrenProp & TextProps

function Container({ children, ...restProps }: IContainerProps) {
  return (
    <Stack {...restProps}>
      {children}
    </Stack>
  )
}

function Title({ children, ...restProps }: ITitleProps) {
  return (
    <Heading
      fontSize="16px"
      textTransform="uppercase"
      color="orange.500"
      fontWeight="black"
      {...restProps}
    >
      {children}
    </Heading>
  )
}

function Text({ children, ...restProps }: ITextProps) {
  const textColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.800')
  return (
    <ChakraText
      fontWeight="300"
      fontSize="16"
      color={textColor}
      {...restProps}
    >
      {children}
    </ChakraText>
  )
}

export const BookViewContent = {
  Container,
  Title,
  Text
}
