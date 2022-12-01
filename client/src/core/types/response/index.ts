import { BookLoanParams } from './../bookLoan/index'
import { BookParams } from '../book'

export interface QueryPagination {
  page: number
  pages: number
  limit: number
}

export interface ResponsePatternApi<DataType = any> {
  page: number
  pages: number
  limit: number
  results: DataType
}

export interface BookResponseParams extends ResponsePatternApi<BookParams[]> { }
export interface BookLoanResponseParams extends ResponsePatternApi<BookLoanParams[]> { }
