import { InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react'
import { MagnifyingGlass } from 'phosphor-react'
import { forwardRef } from 'react'
import { SearchInput } from './styled'

const SearchBar = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<MagnifyingGlass />}
    />
    <SearchInput
      ref={ref}
      type='search'
      placeholder='Pesquisar'
      focusBorderColor="orange.400"
      borderWidth="0.5px"
      {...props}
    />
  </InputGroup>
))

export default SearchBar
