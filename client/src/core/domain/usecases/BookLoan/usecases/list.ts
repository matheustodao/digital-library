import { BookLoanParams, ResponseBookLoanParams } from '@type/bookLoan'

export class BookLoanListUseCase {
  handleBookLoans(booksLoaned: ResponseBookLoanParams[]) {
    const loansParsed = booksLoaned.map((currentLoan) => ({
      ...currentLoan,
      book: {
        ...currentLoan.book,
        authors: currentLoan.book.authors?.split(',') ?? ['Desconhecido']
      }
    }))

    return loansParsed as BookLoanParams[]
  }
}
