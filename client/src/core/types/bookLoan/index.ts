import { BookParams } from '../book'

type LoanedBookParams = Pick<BookParams, 'id' | 'title' | 'authors' | 'cover' | 'tumble' | 'publishingCompany'>

export type LoanBookStatus = 'no_warning' | 'first_warning' | 'second_warning' | 'third_warning' | string

export interface BookLoanParams {
  id: string
  book: LoanedBookParams
  exitDate: string
  deliveryDate: string
  personName: string
  status: LoanBookStatus
  class?: string | null
  teacherName?: string | null
  email?: string | null
  phone?: string | null
  isStudent: boolean
  bookId: string

}

export interface CreateBookLoanParams extends Omit<BookLoanParams, 'id' | 'book' | 'status'> { }
export interface UpdateBookLoanParams extends BookLoanParams { }
