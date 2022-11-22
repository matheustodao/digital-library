import { CreateBookUseCase } from './usecases/create'
import { FindBookByIdUseCase } from './usecases/findById'
import { ListBooksUseCase } from './usecases/list'

interface BookControllerInterface {
  readonly create: CreateBookUseCase
  readonly list: ListBooksUseCase
  readonly findById: FindBookByIdUseCase
}

export class BookController implements BookControllerInterface {
  public readonly create: CreateBookUseCase
  public readonly list: ListBooksUseCase
  public readonly findById: FindBookByIdUseCase

  constructor() {
    this.create = new CreateBookUseCase()
    this.list = new ListBooksUseCase()
    this.findById = new FindBookByIdUseCase()
  }
}
