import { Box, Flex } from '@chakra-ui/react'

import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { BookLoanParams } from '@type/bookLoan'
import { bookLoanServices } from '@services/bookLoan'
import BooksLoanedList from './components/BooksLoanedList'

export default function LoansBooksPage() {
  const navigation = useNavigate()
  const [booksLoaned, setBooksLoaned] = useState([] as BookLoanParams[])

  const loadBooksLoaned = useCallback(async () => {
    const data = await bookLoanServices.index()
    setBooksLoaned(data)
  }, [])

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
            placeholder: 'Pesquise por nome da pessoa ou autor, titulo do livro...'
          }}
        />
      </Box>

      {!!booksLoaned.length && (
        <BooksLoanedList loans={booksLoaned} />
      )}
    </>
  )
}
