import { Button } from '@chakra-ui/react'
import React from 'react'
import SortIcon from './components/SortIcon'

interface SortButtonProps {
  sort: 'asc' | 'desc'
  onSort: () => void
}

export default function SortButton({ onSort, sort }: SortButtonProps) {
  return (
    <Button
      bg="orange.100"
      color="orange.900"
      leftIcon={<SortIcon sort={sort} />}
      transition="all .35s ease"
      _hover={{ bg: 'orange.200' }}
      _active={{ bg: 'orange.200' }}
      onClick={onSort}
      w="175px"
    >
      <span style={{ width: '96px' }}>
        {sort === 'asc' ? 'Crescente' : 'Decrescente'}
      </span>
    </Button>
  )
}
