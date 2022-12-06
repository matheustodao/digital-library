import { Flex, FlexProps } from '@chakra-ui/react'
import BookCard from '@components/Book/Card'
import { BookParams } from '@type/book'
import { forwardRef } from 'react'

interface BooksListProps {
  books: BookParams[]
  _flexProps?: FlexProps
}

const BooksList = forwardRef(({ books, _flexProps }: BooksListProps, currentRef) => {
  if (!books.length) return null

  return (
    <Flex flexWrap="wrap" gap="32px 24px" {..._flexProps}>
      {books.map((book) => (
        <BookCard book={book} key={book.id} ref={currentRef as never} />
      ))}
    </Flex>
  )
})

export default BooksList
