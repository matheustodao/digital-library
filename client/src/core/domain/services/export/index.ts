import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

class ExportDataServices extends HttpClientDigitalLibrary {
  async exportXLSX(data: { format: 'xlsx', content: 'books' | 'loans' }) {
    return this.httpClient.post({ path: '/export', data, options: { responseType: 'blob' } })
  }

  async exportPDF(data: { format: 'pdf', content: 'books' | 'loans' }) {
    return this.httpClient.post({
      path: '/export',
      data,
      options: {
        headers: {
          accept: 'application/pdf'
        }
      }
    })
  }
}

export const exportDataServices = new ExportDataServices()
