import { BookLoanParams } from './../loanBook/index';
import { Book } from '../book';

export type QueryPagination = {
	page: string,
  limit: string,
}

export interface ResponsePatternApi<DataType = any> {
	page: number,
  limit: number,
	pages: number,
  results: DataType
}

export interface BookResponseParams extends ResponsePatternApi<any[]> {}
export interface BookLoanResponseParams
	extends ResponsePatternApi<BookLoanParams[]> {}
