import BookCard from '@components/Book/Card'

import books from '@mocks/books.json'
import Title from '@components/pages/Title'

export default function HomePage() {
  return (
    <>
      <Title>Home</Title>

      {books.results.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </>
  )
}
