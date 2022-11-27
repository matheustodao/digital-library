import { UpdateBookLoanedUseCase } from './usecases/update'

export interface BookLoanControllerType {
  readonly update: UpdateBookLoanedUseCase
}

export class BookLoanController implements BookLoanControllerType {
  readonly update: UpdateBookLoanedUseCase

  constructor() {
    this.update = new UpdateBookLoanedUseCase()
  }
}
