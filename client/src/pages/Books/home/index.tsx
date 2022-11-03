import BookCard from '@components/Book/Card'

import books from '@mocks/books.json'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'

export default function BooksPage() {
  return (
    <>
      <Title>Livros</Title>

      <Box pb="8">
        <HeaderPage
          button={{
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
