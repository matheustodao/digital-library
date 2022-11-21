import { Flex, FlexProps } from '@chakra-ui/react'
import BookCard from '@components/Book/Card'
import { BookParams } from '@type/digitalLibrary/book'

interface BooksListProps {
  books: BookParams[]
  _flexProps?: FlexProps
}

export default function BooksList({ books, _flexProps }: BooksListProps) {
  return (
    <Flex flexWrap="wrap" gap="32px 24px" {..._flexProps}>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </Flex>
  )
}
