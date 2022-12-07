import { Flex, Stack, StackProps, useMediaQuery } from '@chakra-ui/react'
import { forwardRef, useMemo, useState } from 'react'
import { ButtonPage, ButtonProps } from './components/ButtonPage'

interface PaginationProps {
  totalPages: number
  onChange?: (page: number) => void
  _buttonPageProps?: ButtonProps
  _containerProps?: StackProps
}

const Pagination = forwardRef(({ totalPages, onChange = () => {}, _buttonPageProps, _containerProps }: PaginationProps, ref) => {
  const arrPages: number[] = [...Array.from({ length: totalPages }).keys()]
  const [page, setPage] = useState(1)
  const [smallerThan630] = useMediaQuery('(max-width: 630px)')
  const [smallerThan472] = useMediaQuery('(max-width: 472px)')

  const responsiveStartIndex = useMemo(() => {
    const initialPage = page - 1
    const initialIndexPage = initialPage === -1 ? 0 : initialPage
    if (smallerThan472) return initialIndexPage

    const percentPage = Number((page / (totalPages * 100)).toFixed(3)) * 100

    if (!smallerThan630 && totalPages <= 10) return 0

    return percentPage >= 0.3 ? initialIndexPage : 0
  }, [smallerThan472, smallerThan630, page])

  const responsiveEndIndex = useMemo(() => {
    const pageIndex = page + 1

    if (smallerThan472) return pageIndex
    if (smallerThan630) return page >= 3 ? pageIndex : 3
    if (totalPages <= 10) return totalPages

    return page >= 10 ? pageIndex : 10
  }, [smallerThan472, smallerThan630, page])

  function handleNextPage() {
    setPage((oldPage) => {
      const newPageValue = oldPage === totalPages ? totalPages : oldPage + 1
      onChange(newPageValue)
      return newPageValue
    })
  }

  function handlePrevPage() {
    setPage((oldPage) => {
      const newPageValue = oldPage === 1 ? 1 : oldPage - 1
      onChange(newPageValue)
      return newPageValue
    })
  }

  function handleClickInPageTargeted(number: number) {
    setPage(number)
    onChange(number)
  }

  return (
    <Stack direction="row" {..._containerProps} ref={ref as never}>
      <ButtonPage
        content="<"
        _buttonProps={{
          onClick: () => handlePrevPage(),
          disabled: page === 0
        }}
      />

      <Flex gap="12px">
        {arrPages
          .slice(
            responsiveStartIndex,
            responsiveEndIndex)
          .map((value) => (
            <ButtonPage
              key={`page-${value + 1}`}
              content={value + 1}
              isActive={(value + 1) === page}
              _buttonProps={{
                onClick: () => handleClickInPageTargeted(value + 1)
              }}
              {..._buttonPageProps}
            />
          ))}
      </Flex>

      <ButtonPage
        content=">"
        _buttonProps={{
          onClick: () => handleNextPage(),
          disabled: page === totalPages
        }}
      />
    </Stack>
  )
})

export default Pagination
