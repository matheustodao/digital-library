import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { NewBookParams } from '@type/digitalLibrary/book'
import { indexBooksUseCase, IndexBooksUseCase } from './usecases'
import { CreateBookUseCase, createBookUseCase } from './usecases/create'

interface BooksUseCaseType {
  create: CreateBookUseCase
  index: IndexBooksUseCase
}

export class BooksServices extends HttpClientDigitalLibrary {
  protected usecase: BooksUseCaseType

  constructor() {
    super('/book')
    this.usecase = {
      create: createBookUseCase,
      index: indexBooksUseCase
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
}

export const booksServices = new BooksServices()
