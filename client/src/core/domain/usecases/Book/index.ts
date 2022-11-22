import { CreateBookUseCase } from './usecases/create'
import { DeleteBookUseCase } from './usecases/delete'
import { FindBookByIdUseCase } from './usecases/findById'
import { ListBooksUseCase } from './usecases/list'

interface BookControllerInterface {
  readonly create: CreateBookUseCase
  readonly list: ListBooksUseCase
  readonly findById: FindBookByIdUseCase
  readonly delete: DeleteBookUseCase
}

export class BookController implements BookControllerInterface {
  public readonly create: CreateBookUseCase
  public readonly list: ListBooksUseCase
  public readonly findById: FindBookByIdUseCase
  public readonly delete: DeleteBookUseCase

  constructor() {
    this.create = new CreateBookUseCase()
    this.list = new ListBooksUseCase()
    this.findById = new FindBookByIdUseCase()
    this.delete = new DeleteBookUseCase()
  }
}
