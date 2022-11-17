import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import BookCard from '@components/Book/Card'
import { BookParams } from '@type/digitalLibrary/book'

interface BooksListProps {
  books: BookParams[]
  _simpleGridProps?: SimpleGridProps
}

export default function BooksList({ books, _simpleGridProps }: BooksListProps) {
  return (
    <SimpleGrid
      minChildWidth={249}
      spacingX="24px"
      spacingY="32px"
      {..._simpleGridProps}
    >
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </SimpleGrid>
  )
}
