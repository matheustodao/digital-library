import { BookLoanParams } from './../bookLoan/index'
import { BookParams } from '../book'

export interface ResponsePatternApi<DataType = any> {
  pages: number
  perPage: number
  results: DataType[]
}

export interface BookResponseParams extends ResponsePatternApi<BookParams> { }
export interface BookLoanResponseParams extends ResponsePatternApi<BookLoanParams> { }
