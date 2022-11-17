import { BookParams } from '@type/digitalLibrary/book'
import MissingParam from '@infra/errors/MissingParam'

export class FindBookByIdUseCase {
  handleParams(params: { bookId: string }) {
    if (!params.bookId) {
      throw new MissingParam('bookId')
    }

    return params
  }

  handleBook(currentBook: BookParams): BookParams {
    const book = {} as BookParams

    Object.entries(currentBook).forEach(([key, value]) => {
      if (key === 'authors' || key === 'categories') {
        Object.assign(book, { [key]: value?.split(',') ?? ['Desconhecido'] })
        return
      }

      Object.assign(book, { [key]: value })
    })

    return book
  }
}

export const findBookByIdUseCase = new FindBookByIdUseCase()
