import BookLoanCard from '@components/BookLoan/Card'
import BookCard from '@components/Book/Card'

import books from '@mocks/books.json'
import loansBooks from '@mocks/loansBooks.json'
import Title from '@components/pages/Title'

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
