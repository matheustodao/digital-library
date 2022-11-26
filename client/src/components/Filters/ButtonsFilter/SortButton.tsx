import { Button, ButtonProps, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import SortIcon from './components/SortIcon'

interface SortButtonProps {
  sort: 'asc' | 'desc'
  onSort: () => void
  ascLabel?: string | null
  descLabel?: string | null
  iconButton?: ReactElement | null
  _buttonProps?: ButtonProps
}

export default function SortButton({ onSort, sort, ascLabel, descLabel, iconButton, _buttonProps }: SortButtonProps) {
  return (
    <Button
      bg="orange.100"
      color="orange.900"
      leftIcon={iconButton ?? <SortIcon sort={sort} />}
      transition="all .35s ease"
      _hover={{ bg: 'orange.200' }}
      _active={{ bg: 'orange.200' }}
      onClick={onSort}
      flex="175px 1 100px"
      {..._buttonProps}
    >
      <Text as="span" noOfLines={1}>
        {sort === 'asc' ? ascLabel : descLabel}
      </Text>
    </Button>
  )
}

SortButton.defaultProps = {
  ascLabel: 'Crescente',
  descLabel: 'Decrescente'
}
