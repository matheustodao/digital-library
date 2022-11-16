import styled from 'styled-components'
import { Input as InputChakra, InputProps } from '@chakra-ui/react'

export const Input = styled(InputChakra).attrs((): InputProps => ({
  focusBorderColor: 'orange.500',
  _placeholder: {
    fontSize: '14px'
  }
}))<InputProps>``
