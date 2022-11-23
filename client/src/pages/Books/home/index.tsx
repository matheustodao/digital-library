/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@components/Book/Card'

import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react'
import HeaderPage from '@components/pages/HeaderPage'
import { Plus, SortAscending, SortDescending } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { booksServices } from '@services/books'
import { BookParams } from '@type/book'
import BooksList from './components/BooksList'
import NotBookFound from '@components/Book/errors/NotBookFound'
import SortButton from '@components/Filters/ButtonsFilter/SortButton'

export default function BooksPage() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<BookParams[]>([] as BookParams[])
  const [sortBook, setSortBook] = useState<'asc' | 'desc'>('asc')

  const loadBooks = useCallback(async () => {
    const data = await booksServices.index({
      filters: {
        orderBy: sortBook
      }
    })
    setBooks(data)
  }, [sortBook])

  function handleToggleSortBook() {
    setSortBook((oldState) => (oldState === 'asc' ? 'desc' : 'asc'))
  }

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  return (
    <>
      <Title>Livros</Title>

      <Box pb="8">
        <HeaderPage
          button={{
            onClick: () => navigate('/books/new'),
            label: (
              <Flex align="center" gap="2">
                <Plus weight="bold" />
                Novo livro
              </Flex>
            )
          }}
          search={{
            placeholder: 'Pesquise por autor, titulo do livro, sinopse...'
          }}
        />

        <Box mt="18px">
          <SortButton sort={sortBook} onSort={handleToggleSortBook} />
        </Box>
      </Box>

      <BooksList books={books} />

      {!books.length && (
        <NotBookFound />
      )}
    </>
  )
}
