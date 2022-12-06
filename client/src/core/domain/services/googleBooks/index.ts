import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

class GoogleBookServices extends HttpClientDigitalLibrary {
  constructor() {
    super('/google')
  }

  async index(filters?: { q: string }) {
    return await this.httpClient.get({
      path: '/books',
      options: {
        params: filters
      }
    })
  }
}

export const googleBookServices = new GoogleBookServices()
