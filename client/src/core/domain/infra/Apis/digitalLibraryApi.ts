import HttpClient from '../HttpClient'

export class HttpClientDigitalLibrary {
  readonly httpClient: HttpClient

  constructor(readonly prefiXPath: string = '') {
    this.httpClient = new HttpClient('http://localhost:3001')
    this.httpClient.prefixPath = prefiXPath
  }
}

export const digitalLibraryApi = new HttpClientDigitalLibrary().httpClient
