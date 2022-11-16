import { digitalLibraryApi } from '@infra/Apis/digitalLibraryApi'
import HttpClient from '@infra/HttpClient'

class GoogleBookServices {
  readonly httpClient: HttpClient
  constructor() {
    this.httpClient = digitalLibraryApi
  }

  async index(filters?: { q: string }) {
    return await this.httpClient.get({
      path: '/google/books',
      options: {
        params: filters
      }
    })
  }
}

export const googleBookServices = new GoogleBookServices()
