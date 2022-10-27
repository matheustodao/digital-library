import { Input } from '@chakra-ui/react'
import styled from 'styled-components'

export const SearchInput = styled(Input)`
  &[type="search"]::-webkit-search-decoration,
  &[type="search"]::-webkit-search-cancel-button,
  &[type="search"]::-webkit-search-results-button,
  &[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`
