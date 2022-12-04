import { Flex, FlexProps } from '@chakra-ui/react'
import BookCard from '@components/Book/Card'
import { BookParams } from '@type/book'
import { forwardRef } from 'react'

interface BooksListProps {
  books: BookParams[]
  _flexProps?: FlexProps
}

const BooksList = forwardRef(({ books, _flexProps }: BooksListProps, currentRef) => {
  return (
    <Flex flexWrap="wrap" gap="32px 24px" {..._flexProps} ref={currentRef as never}>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </Flex>
  )
})

export default BooksList
