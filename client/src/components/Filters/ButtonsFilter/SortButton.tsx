import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import SortIcon from './components/SortIcon'

interface SortButtonProps {
  sort: 'asc' | 'desc'
  onSort: () => void
  ascLabel?: string | null
  descLabel?: string | null
  _buttonProps?: ButtonProps
}

export default function SortButton({ onSort, sort, ascLabel, descLabel, _buttonProps }: SortButtonProps) {
  return (
    <Button
      bg="orange.100"
      color="orange.900"
      leftIcon={<SortIcon sort={sort} />}
      transition="all .35s ease"
      _hover={{ bg: 'orange.200' }}
      _active={{ bg: 'orange.200' }}
      onClick={onSort}
      {..._buttonProps}
    >
      <span style={{ minWidth: '96px' }}>
        {sort === 'asc' ? ascLabel : descLabel}
      </span>
    </Button>
  )
}

SortButton.defaultProps = {
  ascLabel: 'Crescente',
  descLabel: 'Decrescente'
}
