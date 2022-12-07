/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { booksServices } from '@services/books'
import { BookParams } from '@type/book'
import BooksList from './components/BooksList'
import NotBookFound from '@components/Book/errors/NotBookFound'
import SortButton from '@components/Filters/ButtonsFilter/SortButton'
import NotFoundData from '@components/Errors/NotFoundData'
import BookLoader from '@components/Loader'
import Pagination from '@components/Pagination'

export default function BooksPage() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<BookParams[]>([] as BookParams[])
  const [sortBook, setSortBook] = useState<'asc' | 'desc'>('asc')
  const [searchByTerm, setSearchByTerm] = useState('')
  const [infoPagination, setInfoPagination] = useState({ total: 1, page: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [hasSearchedBookByTerm, setHasSearchedBookByTerm] = useState(false)

  const loadBooks = useCallback(async () => {
    try {
      const data = await booksServices.index({
        filters: {
          orderBy: sortBook,
          text: searchByTerm
        },
        pagination: {
          page: searchByTerm ? null : infoPagination.page,
          limit: 1
        }
      })

      setHasSearchedBookByTerm(Boolean(searchByTerm) && !data.results.length)
      setInfoPagination({ total: data.pages, page: data.page })
      setBooks(data.results)
    } finally {
      setIsLoading(false)
    }
  }, [sortBook, searchByTerm, infoPagination.page])

  function handleToggleSortBook() {
    setSortBook((oldState) => (oldState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchByTerm(e: ChangeEvent<HTMLInputElement>) {
    setTimeout(() => {
      setSearchByTerm(e.target.value)
    }, 500)
  }

  function onChangePage(currentPage: number) {
    setInfoPagination((oldInfo) => ({ ...oldInfo, page: currentPage }))
  }

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  if (isLoading) return <BookLoader />

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
            placeholder: 'Pesquise por autor, titulo do livro, sinopse...',
            onChange: (e) => handleChangeSearchByTerm(e)
          }}
        />

        <Box mt="18px">
          <SortButton sort={sortBook} onSort={handleToggleSortBook} />
        </Box>
      </Box>

      <BooksList books={books} />

      {(!books.length && !hasSearchedBookByTerm) && (
        <NotBookFound />
      )}

      {hasSearchedBookByTerm && (
        <NotFoundData />
      )}

      {Boolean(books.length) && (
        <Pagination totalPages={infoPagination.total} onChange={onChangePage} _containerProps={{ pt: '42px' }} />
      )}
    </>
  )
}
