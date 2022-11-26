import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { FilterOptionsType } from '@type/index'

interface ListOptionParams {
  filters?: FilterOptionsType & {
    orderDeliveryDateBy?: 'asc' | 'desc'
  }
}

class BookLoanServices extends HttpClientDigitalLibrary {
  constructor() {
    super('/book-loan')
  }

  async create(data: any) {
    return this.httpClient.post({
      data
    })
  }

  async index(options?: ListOptionParams) {
    return this.httpClient.get({
      options: {
        params: options?.filters
      }
    })
  }

  async show(id: string) {
    return this.httpClient.get({
      path: `/${id}`
    })
  }
}

export const bookLoanServices = new BookLoanServices()
