import BookCard from 'src/components/Book/Card'
import BookLoanCard from 'src/components/BookLoan/Card'

import books from '@mocks/books.json'
import loansBooks from '@mocks/loansBooks.json'
import Title from 'src/components/pages/Title'

export default function HomePage() {
  return (
    <>
      <Title>Home</Title>

      {books.results.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
      {loansBooks.results.map((loan) => (
        <BookLoanCard loan={loan} key={loan.id} />
      ))}
    </>
  )
}
