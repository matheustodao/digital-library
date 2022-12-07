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
    const parsedData = this.usecase.common.handleData(data)
    return this.httpClient.post({ path: '/books', data: parsedData })
  }

  async loans(data: Omit<ImportParams, 'type'>) {
    const parsedData = this.usecase.common.handleData(data)
    return this.httpClient.post({ path: '/loans', data: parsedData })
  }
}

export const importDataServices = new ImportDataServices()
