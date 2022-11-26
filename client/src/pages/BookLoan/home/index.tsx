import { Box, Flex } from '@chakra-ui/react'

import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { BookLoanParams } from '@type/bookLoan'
import { bookLoanServices } from '@services/bookLoan'
import BooksLoanedList from './components/BooksLoanedList'
import NotFoundData from '@components/Errors/NotFoundData'
import SortButton from '@components/Filters/ButtonsFilter/SortButton'

export default function LoansBooksPage() {
  const navigation = useNavigate()
  const [booksLoaned, setBooksLoaned] = useState([] as BookLoanParams[])
  const [sortBook, setSortBook] = useState<'asc' | 'desc'>('asc')
  const [orderDeliveryDateBy, setOrderDeliveryDateBy] = useState<'asc' | 'desc'>('asc')
  const [searchByTerm, setSearchByTerm] = useState('')
  const [hasSearchedBookByTerm, setHasSearchedBookByTerm] = useState(false)

  const loadBooksLoaned = useCallback(async () => {
    const data = await bookLoanServices.index({
      filters: {
        orderBy: sortBook,
        text: searchByTerm,
        orderDeliveryDateBy
      }
    })
    setBooksLoaned(data)
    setHasSearchedBookByTerm(Boolean(searchByTerm) && !data.length)
  }, [sortBook, searchByTerm, orderDeliveryDateBy])

  function handleToggleSortBook() {
    setSortBook((oldState) => (oldState === 'asc' ? 'desc' : 'asc'))
  }

  function handleToggleOrderDeliveryDateBy() {
    setOrderDeliveryDateBy((oldState) => (oldState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchByTerm(e: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      setSearchByTerm(e.target.value)
    }, 500)
  }

  useEffect(() => {
    loadBooksLoaned()
  }, [loadBooksLoaned])

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
          <Flex gap="12px" w="full">
            <SortButton sort={sortBook} onSort={handleToggleSortBook} ascLabel="Nome Crescente" descLabel="Nome Decrescente" />
            <SortButton sort={orderDeliveryDateBy} onSort={handleToggleOrderDeliveryDateBy} ascLabel="Entrega Crescente" descLabel="Entrega Decrescente" />
          </Flex>
        </Box>
      </Box>

      <BooksLoanedList loans={booksLoaned} />

      {(!booksLoaned.length && !hasSearchedBookByTerm) && (
        <p>Não há emprestimo</p>
      )}

      {hasSearchedBookByTerm && (
        <NotFoundData />
      )}
    </>
  )
}
