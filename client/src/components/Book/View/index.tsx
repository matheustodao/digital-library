import { Flex, Box, Image, SimpleGrid, Tag, Button, useMediaQuery } from '@chakra-ui/react'

import books from '@mocks/books.json'
import { CaretRight } from 'phosphor-react'
import { ReactNode } from 'react'
import { BookViewContent } from './components/BookContent'

interface IProps {
  children?: ReactNode
}

export default function BookView({ children }: IProps) {
  const book = books.results[0]
  const [isSmallThan900] = useMediaQuery('(max-width: 900px)')
  const [isSmallThan395] = useMediaQuery('(max-width: 395px)')
  return (
    <Box>
      <Flex
        direction={isSmallThan900 ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
        gap="24px"
      >
        <Box>
          <Image
            width="100%"
            maxH="525px"
            h="525px"
            w="345px"
            src={book.bookCover}
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/525"
            alt={book.title}
            borderTopRadius="md"
          />
        </Box>

        <Flex direction="column" h="full" gap="32px" maxW="479px">
          <BookViewContent.Container>
            <BookViewContent.Title>Titulo do livro</BookViewContent.Title>
            <BookViewContent.Text fontSize="32" fontWeight="300">{book.title}</BookViewContent.Text>
          </BookViewContent.Container>

          <BookViewContent.Container>
            <BookViewContent.Title>Categorias</BookViewContent.Title>
            <Flex gap="8px" flexWrap="wrap">
              {book.categories.slice(0, 5).map((category) => (
                <Tag colorScheme="gray" key={category}>{category}</Tag>
              ))}
            </Flex>
          </BookViewContent.Container>

          <SimpleGrid columns={isSmallThan395 ? 1 : 2} rowGap="8" width="100%" columnGap={{ sm: '40', md: '50%' }}>
            <BookViewContent.Container>
              {book.authors.length > 1 && (
                <Button variant="unstyled" h="min-content">
                  <BookViewContent.Title>
                    <Flex alignItems="center">
                      Autores
                      <CaretRight />
                    </Flex>
                  </BookViewContent.Title>
                </Button>
              )}

              {book.authors.length === 1 && (
                <BookViewContent.Title>Autor</BookViewContent.Title>
              )}

              {book.authors.slice(0, 1).map((author) => (
                <BookViewContent.Text
                  key={author}
                  fontWeight="300"
                  fontSize="16"
                >
                    {author}
                </BookViewContent.Text>
              ))}
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Editora</BookViewContent.Title>
              <BookViewContent.Text>{book.publishingCompany}</BookViewContent.Text>
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Isbn</BookViewContent.Title>
              <BookViewContent.Text>{book.isbn}</BookViewContent.Text>
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Tombo</BookViewContent.Title>
              <BookViewContent.Text>{book.tumble}</BookViewContent.Text>
            </BookViewContent.Container>
          </SimpleGrid>
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}
