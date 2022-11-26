import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

class BookLoanServices extends HttpClientDigitalLibrary {
  constructor() {
    super('/book-loan')
  }

  async create(data: any) {
    return this.httpClient.post({
      data
    })
  }

  async index() {
    return this.httpClient.get()
  }

  async show(id: string) {
    return this.httpClient.get({
      path: `/${id}`
    })
  }
}

export const bookLoanServices = new BookLoanServices()
