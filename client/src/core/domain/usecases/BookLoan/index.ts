import { BookLoanListUseCase } from './usecases/list'
import { UpdateBookLoanedUseCase } from './usecases/update'

export interface BookLoanControllerType {
  readonly update: UpdateBookLoanedUseCase
  readonly list: BookLoanListUseCase
}

export class BookLoanController implements BookLoanControllerType {
  readonly update: UpdateBookLoanedUseCase
  readonly list: BookLoanListUseCase

  constructor() {
    this.update = new UpdateBookLoanedUseCase()
    this.list = new BookLoanListUseCase()
  }
}
