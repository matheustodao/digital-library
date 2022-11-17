import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { NewBookParams } from '@type/digitalLibrary/book'
import { CreateBookUseCase, createBookUseCase } from './usecases/create'

interface BooksUseCaseType {
  create: CreateBookUseCase
}

export class BooksServices extends HttpClientDigitalLibrary {
  protected usecase: BooksUseCaseType

  constructor() {
    super('/book')
    this.usecase = {
      create: createBookUseCase
    }
  }

  async create(data: NewBookParams) {
    const validData = this.usecase.create.handleParams(data)

    return this.httpClient.post({
      data: validData
    })
  }
}

export const booksServices = new BooksServices()
