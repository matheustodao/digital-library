import { Flex, Stack, useMediaQuery } from '@chakra-ui/react'
import { forwardRef, useMemo } from 'react'
import { ButtonPage, ButtonProps } from './components/ButtonPage'

interface PaginationProps {
  totalPages: number
  currentPage: number
  _buttonPageProps?: ButtonProps
}

const Pagination = forwardRef(({ totalPages, currentPage, _buttonPageProps }: PaginationProps, ref) => {
  const arrPages: number[] = [...Array.from({ length: totalPages }).keys()]
  const [smallerThan630] = useMediaQuery('(max-width: 630px)')
  const [smallerThan472] = useMediaQuery('(max-width: 472px)')
  const startIndex = useMemo(() => {
    if (smallerThan472) return currentPage
    return 0
  }, [smallerThan472])

  const endIndex = useMemo(() => {
    if (smallerThan472) return currentPage + 1
    if (smallerThan630) return 3
    return 5
  }, [smallerThan472, smallerThan630])

  return (
    <Stack direction="row">
      <ButtonPage content="<" />

      <Flex gap="12px">
        {arrPages.slice(startIndex, endIndex).map((value, index) => (
          <ButtonPage
            key={`page-${index}`}
            content={value + 1}
            isActive={value === currentPage}
            {..._buttonPageProps}
          />
        ))}

        {smallerThan472 && (
          <>
            <ButtonPage
              content="..."
              _buttonProps={{
                disabled: true,
                _hover: { bg: 'none' },
                cursor: 'default !important'
              }}
            />

            {arrPages.slice(totalPages - 1).map((value) => (
              <ButtonPage key={`page-${value}`} content={value + 1} {..._buttonPageProps} />
            ))}
          </>
        )}

        {!smallerThan472 && arrPages.slice(totalPages - 2).map((value) => (
          <ButtonPage key={`page-${value}`} content={value + 1} {..._buttonPageProps} />
        ))}
      </Flex>

      <ButtonPage content=">" />
    </Stack>
  )
})

export default Pagination
