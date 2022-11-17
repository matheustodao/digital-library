import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { NewBookParams } from '@type/digitalLibrary/book'
import { indexBooksUseCase, IndexBooksUseCase } from './usecases'
import { CreateBookUseCase, createBookUseCase } from './usecases/create'
import { findBookById, FindBookById } from './usecases/findById'

interface BooksUseCaseType {
  create: CreateBookUseCase
  index: IndexBooksUseCase
  findById: FindBookById
}

export class BooksServices extends HttpClientDigitalLibrary {
  protected usecase: BooksUseCaseType

  constructor() {
    super('/book')
    this.usecase = {
      create: createBookUseCase,
      index: indexBooksUseCase,
      findById: findBookById
    }
  }

  async index() {
    const books = await this.httpClient.get()
    const booksParsed = this.usecase.index.handleBooks(books)

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
}

export const booksServices = new BooksServices()
