import MissingParam from '@infra/errors/MissingParam'

export class DeleteBookUseCase {
  handleParams(params: { bookId: string }) {
    if (!params.bookId) {
      throw new MissingParam('bookId')
    }

    return params
  }
}
