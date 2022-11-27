import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { BookLoanParams, UpdateBookLoanParams } from '@type/bookLoan'
import { FilterOptionsType } from '@type/index'
import { BookLoanController } from '@usecases/BookLoan'

interface ListOptionParams {
  filters?: FilterOptionsType & {
    orderDeliveryDateBy?: 'asc' | 'desc'
  }
}

class BookLoanServices extends HttpClientDigitalLibrary {
  readonly usecase: BookLoanController

  constructor() {
    super('/book-loan')
    this.usecase = new BookLoanController()
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

  async update(id: string, data: UpdateBookLoanParams, originalValues?: BookLoanParams) {
    const response = await this.httpClient.patch({
      data: {
        ...data,
        id
      }
    })

    const bookLoaned = this.show(response.id)

    return bookLoaned
  }

  async delete(id: string) {
    return this.httpClient.delete({
      path: `/${id}`
    })
  }
}

export const bookLoanServices = new BookLoanServices()
