import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { BookParams, NewBookParams } from '@type/book'
import { BookController } from '@usecases/Book'

export class BooksServices extends HttpClientDigitalLibrary {
  protected usecase: BookController

  constructor() {
    super('/book')
    this.usecase = new BookController()
  }

  async index() {
    const books = await this.httpClient.get()
    const booksParsed = this.usecase.list.handleBooks(books)

    return booksParsed
  }

  async create(data: NewBookParams) {
    const validData = this.usecase.create.handleParams(data)

    return this.httpClient.post({
      data: validData
    })
  }

  async show(bookId: string) {
    const validParams = this.usecase.findById.handleParams({ bookId })

    const book = await this.httpClient.get({
      path: `/${validParams.bookId}`
    })

    return this.usecase.findById.handleBook(book)
  }

  async update(id: string, newValues: NewBookParams, originalValues?: BookParams) {
    const fieldsHaveChanged = this.usecase.update.handleParams(newValues, originalValues)

    if (JSON.stringify(fieldsHaveChanged) === '{}') return false

    const bookUpdated = await this.httpClient.patch({
      data: { ...fieldsHaveChanged, id }
    })

    const bookParsed = this.usecase.findById.handleBook(bookUpdated)

    return bookParsed
  }

  async delete(bookId: string) {
    const validParams = this.usecase.delete.handleParams({ bookId })

    return this.httpClient.delete({
      path: `/${validParams.bookId}`
    })
  }
}

export const booksServices = new BooksServices()
