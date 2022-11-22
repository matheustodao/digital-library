import { BookParams } from '@type/digitalLibrary/book'

export class IndexBooksUseCase {
  handleBooks(books: BookParams[]): BookParams[] {
    const booksParsed = books.map((currentBook) => {
      const book = {}
      Object.entries(currentBook).forEach(([key, value]) => {
        if (key === 'authors' || key === 'categories') {
          Object.assign(book, { [key]: value?.split(',') ?? ['Desconhecido'] })
          return
        }

        Object.assign(book, { [key]: value })
      })

      return book
    })

    return booksParsed as BookParams[]
  }
}

export const indexBooksUseCase = new IndexBooksUseCase()
