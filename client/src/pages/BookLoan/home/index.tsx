import { Box, Button, Flex, Text } from '@chakra-ui/react'

import HeaderPage from '@components/pages/HeaderPage'
import { Plus, X } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BookLoanParams } from '@type/bookLoan'
import { bookLoanServices } from '@services/bookLoan'
import BooksLoanedList from './components/BooksLoanedList'
import NotFoundData from '@components/Errors/NotFoundData'
import SortButton from '@components/Filters/ButtonsFilter/SortButton'
import NotBookLoanedFound from '@components/BookLoan/errors/NotBookLoanedFound'
import BookLoader from '@components/Loader'
import Pagination from '@components/Pagination'

export default function LoansBooksPage() {
  const navigation = useNavigate()
  const [booksLoaned, setBooksLoaned] = useState([] as BookLoanParams[])
  const [sortBook, setSortBook] = useState<'asc' | 'desc'>('asc')
  const [orderDeliveryOutDate, setOrderDeliveryOutDate] = useState<null | 'out_date'>(null)
  const [orderDeliveryInDate, setOrderDeliveryInDate] = useState<null | 'in_date'>(null)
  const [searchByTerm, setSearchByTerm] = useState('')
  const [hasSearchedBookByTerm, setHasSearchedBookByTerm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [infoPagination, setInfoPagination] = useState({ total: 1, page: 1 })

  const loadBooksLoaned = useCallback(async () => {
    try {
      const data = await bookLoanServices.index({
        filters: {
          orderBy: sortBook,
          text: searchByTerm,
          date: orderDeliveryInDate ?? orderDeliveryOutDate
        },
        pagination: {
          page: searchByTerm ? null : infoPagination.page
        }
      })
      setHasSearchedBookByTerm(Boolean(searchByTerm) && !data.results.length)
      setBooksLoaned(data.results)
      setInfoPagination({ total: data.pages, page: data.page })
    } finally {
      setIsLoading(false)
    }
  }, [sortBook, searchByTerm, orderDeliveryInDate, orderDeliveryOutDate, infoPagination.page])

  function handleToggleSortBook() {
    setSortBook((oldState) => (oldState === 'asc' ? 'desc' : 'asc'))
  }

  function onChangePage(currentPage: number) {
    setInfoPagination((oldInfo) => ({ ...oldInfo, page: currentPage }))
  }

  function handleToggleOrderDeliveryInDate() {
    setOrderDeliveryInDate((oldState) => (oldState === 'in_date' ? null : 'in_date'))
    setOrderDeliveryOutDate(null)
  }

  function handleToggleOrderDeliveryOutDate() {
    setOrderDeliveryOutDate((oldState) => (
      oldState === 'out_date' ? null : 'out_date'))
    setOrderDeliveryInDate(null)
  }

  function handleChangeSearchByTerm(e: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      setSearchByTerm(e.target.value)
    }, 500)
  }

  useEffect(() => {
    loadBooksLoaned()
  }, [loadBooksLoaned])

  if (isLoading) return <BookLoader />

  return (
    <>
      <Title>Livros Alugados</Title>

      <Box pb="8">
        <HeaderPage
          button={{
            label: (
              <Flex align="center" gap="2">
                <Plus weight="bold" />
                Novo Empréstimo
              </Flex>
            ),
            onClick: () => navigation('new')
          }}
          search={{
            placeholder: 'Busque por nome da pessoa, autor ou titulo do livro',
            onChange: (e) => handleChangeSearchByTerm(e)
          }}
        />

        <Box mt="18px">
          <Flex gap="12px" w="full" flexWrap="wrap">
            <SortButton
              sort={sortBook}
              onSort={handleToggleSortBook}
              ascLabel="Nome Crescente" descLabel="Nome Decrescente"
              _buttonProps={{
                minW: '208px'
              }}
            />

            <Button
              transition="all .35s ease"
              bg={orderDeliveryInDate ? 'red.500' : 'transparent'}
              variant={orderDeliveryInDate ? 'solid' : 'outline'}
              color={orderDeliveryInDate ? 'white' : 'current'}
              leftIcon={orderDeliveryInDate ? <X /> : <></>}
              _hover={{ bg: orderDeliveryInDate ? 'red.400' : 'blackAlpha.300' }}
              _active={{ bg: orderDeliveryInDate ? 'red.400' : 'blackAlpha.300' }}
              onClick={handleToggleOrderDeliveryInDate}
              flex="175px 1 100px"
            >
              <Text as="span" noOfLines={1}>
                Em Dia
              </Text>
            </Button>

            <Button
              transition="all .35s ease"
              bg={orderDeliveryOutDate ? 'red.500' : 'transparent'}
              variant={orderDeliveryOutDate ? 'solid' : 'outline'}
              color={orderDeliveryOutDate ? 'white' : 'current'}
              leftIcon={orderDeliveryOutDate ? <X /> : <></>}
              _hover={{ bg: orderDeliveryOutDate ? 'red.400' : 'blackAlpha.300' }}
              _active={{ bg: orderDeliveryOutDate ? 'red.400' : 'blackAlpha.300' }}
              onClick={handleToggleOrderDeliveryOutDate}
              flex="175px 1 100px"
            >
              <Text as="span" noOfLines={1}>
                Em Atraso
              </Text>
            </Button>
          </Flex>
        </Box>
      </Box>

      <BooksLoanedList loans={booksLoaned} />

      {(!booksLoaned.length && !hasSearchedBookByTerm) && (
        <NotBookLoanedFound />
      )}

      {hasSearchedBookByTerm && (
        <NotFoundData />
      )}

      {Boolean(booksLoaned.length) && (
        <Pagination totalPages={infoPagination.total} onChange={onChangePage} _containerProps={{ pt: '42px' }} />
      )}
    </>
  )
}
