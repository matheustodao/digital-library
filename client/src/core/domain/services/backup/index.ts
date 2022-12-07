import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

class BackupDataServices extends HttpClientDigitalLibrary {
  async backup() {
    return this.httpClient.post({ path: '/backup', data: null, options: { responseType: 'blob' } })
  }
}

export const backupDataServices = new BackupDataServices()
