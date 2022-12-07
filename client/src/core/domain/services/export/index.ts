import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

class ExportDataServices extends HttpClientDigitalLibrary {
  async export(data: { format: 'pdf' | 'xlsx', content: 'books' | 'loans' }) {
    return this.httpClient.post({ path: '/export', data, options: { responseType: 'blob' } })
  }
}

export const exportDataServices = new ExportDataServices()
