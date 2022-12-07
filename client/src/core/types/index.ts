export interface FilterOptionsType {
  text?: string
  orderBy?: 'asc' | 'desc'
}

export interface ExportParams {
  content: 'books' | 'loans'
  format: 'xlsx' | 'pdf'
}

export interface ImportParams {
  type: 'books' | 'loans'
  keepData: 'replace' | 'maintain'
  file: File[]
}
