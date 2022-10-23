import BookCard from 'src/components/Book/Card'
import LoanBookCard from 'src/components/LoanBook/Card'

import books from '@mocks/books.json'
import loansBooks from '@mocks/loansBooks.json'
import { Heading } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <>
      <Heading as="h1">Hello World</Heading>
      {books.results.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
      {loansBooks.results.map((loan) => (
        <LoanBookCard loan={loan} key={loan.id} />
      ))}
    </>
  )
}
