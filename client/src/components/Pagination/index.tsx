import { Flex, Stack, useMediaQuery } from '@chakra-ui/react'
import { forwardRef, useMemo } from 'react'
import { ButtonPage, ButtonProps } from './components/ButtonPage'

interface PaginationProps {
  totalPages: number
  _buttonPageProps?: ButtonProps
}

const Pagination = forwardRef(({ totalPages, _buttonPageProps }: PaginationProps, ref) => {
  const arrPages: number[] = [...Array.from({ length: totalPages }).keys()]
  const [smallerThan630] = useMediaQuery('(max-width: 630px)')
  const [smallerThan472] = useMediaQuery('(max-width: 472px)')
  const endIndex = useMemo(() => {
    if (smallerThan472) return 1
    if (smallerThan630) return 3
    return 5
  }, [smallerThan472, smallerThan630])

  return (
    <Stack direction="row">
      <ButtonPage content="<" />

      <Flex gap="12px">

        {arrPages.slice(0, endIndex).map((value, index) => (
          <ButtonPage key={`page-${index}`} content={value + 1} {..._buttonPageProps} />
        ))}

        <ButtonPage
          content="..."
          _buttonProps={{
            disabled: true,
            _hover: { bg: 'none' },
            cursor: 'default !important'
          }}
        />

        {arrPages.slice(totalPages - (endIndex === 5 ? 3 : endIndex)).map((value) => (
          <ButtonPage key={`page-${value}`} content={value + 1} {..._buttonPageProps} />
        ))}

      </Flex>

      <ButtonPage content=">" />
    </Stack>
  )
})

export default Pagination
