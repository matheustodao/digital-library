import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { ImportParams } from '@type/index'
import { ImportController } from '@usecases/import'

class ImportDataServices extends HttpClientDigitalLibrary {
  readonly usecase = new ImportController()

  constructor() {
    super('/import')
    this.usecase = new ImportController()
  }

  async books(data: Omit<ImportParams, 'type'>) {
    const parsedData = this.usecase.common.handleData(data, 'books')
    return this.httpClient.post({
      path: '/books',
      data: parsedData,
      options: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
  }

  async loans(data: Omit<ImportParams, 'type'>) {
    const parsedData = this.usecase.common.handleData(data, 'loans')
    return this.httpClient.post({
      path: '/loans',
      data: parsedData,
      options: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
  }
}

export const importDataServices = new ImportDataServices()
