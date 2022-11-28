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

  async getGeneralData() {
    const data = await this.httpClient.get({ path: '/dashboard' })
    const studentLoans = this.usecase.generalData.formatToPieGraphNivo('Alunos', data.studentLoans)
    const employeeLoans = this.usecase.generalData.formatToPieGraphNivo('Funcionários', data.employeeLoans)
    const totalBooks = this.usecase.generalData.formatToPieGraphNivo('Total de Livros', data.booksQuantity)
    const totalLoans = this.usecase.generalData.formatToPieGraphNivo('Total de Empréstimos', data.bookLoansQuantity)
    const dataParsed = {
      studentsComparedToEmployee: [studentLoans, employeeLoans],
      booksComparedToLoans: [totalBooks, totalLoans]
    }

    return dataParsed
  }
}

export const reportsServices = new ReportsServices()
