import BookCard from '@components/Book/Card'

import books from '@mocks/books.json'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'

export default function BooksPage() {
  const navigate = useNavigate()

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
      </Box>
      <SimpleGrid minChildWidth={249} spacingX="24px" spacingY="32px">
        {books.results.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </SimpleGrid>
    </>
  )
}
