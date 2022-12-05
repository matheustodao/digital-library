import { Button, ButtonProps as ButtonPropsChakra, Text } from '@chakra-ui/react'
import { forwardRef } from 'react'

export type ButtonProps = ButtonPropsChakra

interface ButtonPageProps {
  content: string | number
  _buttonProps?: ButtonProps
}

export const ButtonPage = forwardRef((props: ButtonPageProps, ref) => {
  return (
    <Button
      variant="unstyled"
      bg="blackAlpha.200"
      w="min-content"
      borderRadius="md"
      transition="all 0.35s ease"
      _hover={{ bg: 'orange.600' }}
      ref={ref as never}
      {...props?._buttonProps}
    >
      <Text as="span">{props.content}</Text>
    </Button>
  )
})
