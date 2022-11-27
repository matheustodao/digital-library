import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { ReportController } from '@usecases/Reports'

class ReportsServices extends HttpClientDigitalLibrary {
  readonly usecase: ReportController

  constructor() {
    super()
    this.usecase = new ReportController()
  }

  async byMonthLoans() {
    const data = await this.httpClient.get({ path: '/book-loan/by/month' })
    const dataParsed = this.usecase.byMonthLoan.formatToLineGraphNivo(data)

    return dataParsed
  }

  async getTopBooksCategories() {
    const data = await this.httpClient.get({ path: '/book/top/categories' })
    const dataParsed = this.usecase.topCategories.formatToPieGraphNivo(data)

    return dataParsed
  }
}

export const reportsServices = new ReportsServices()
