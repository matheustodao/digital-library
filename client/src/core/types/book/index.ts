export interface BookParams {
  id: string
  title: string
  authors: string[]
  categories: string[]
  tumble: string
  publishingCompany: string
  isbn: string
  description: string
  cover: string
  quantity: number
}

export interface NewBookParams extends Omit<BookParams, 'authors' | 'categories' | 'id' | 'isbn' | 'cover' | 'description'> {
  authors: string
  categories: string
  isbn: string | null
  description: string | null
  cover: string | null
}
