import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { GraphPieType } from '@type/lib/nivo'
import { ReportController } from '@usecases/Reports'

export interface GeneralDataResponseType {
  studentsComparedToEmployee: GraphPieType[] | null
  booksComparedToLoans: GraphPieType[] | null
}

class ReportsServices extends HttpClientDigitalLibrary {
  readonly usecase: ReportController

  constructor() {
    super()
    this.usecase = new ReportController()
  }

  async byMonthLoans() {
    const data = await this.httpClient.get({ path: '/book-loan/by/month' })
    const dataParsed = this.usecase.byMonthLoan.formatToLineGraphNivo(data)

    const hasDataToCreateChart = dataParsed.every((currentItem) => (
      currentItem.data.every(({ y }) => y === 0)
    ))

    return !hasDataToCreateChart ? dataParsed : null
  }

  async getTopBooksCategories() {
    const data = await this.httpClient.get({ path: '/book/top/categories' })
    const dataParsed = this.usecase.topCategories.formatToPieGraphNivo(data)

    const hasDataToCreateChart = dataParsed.every((currentItem) => currentItem.value === 0)

    return !hasDataToCreateChart ? dataParsed : null
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

    const hasStudentsComparedToEmployee = dataParsed
      .studentsComparedToEmployee.every((currentItem) => currentItem.value === 0)

    const hasBooksComparedToLoans = dataParsed
      .booksComparedToLoans.every((currentItem) => currentItem.value === 0)

    if (hasStudentsComparedToEmployee) {
      Object.assign(dataParsed, { studentsComparedToEmployee: null })
    }

    if (hasBooksComparedToLoans) {
      Object.assign(dataParsed, { booksComparedToLoans: null })
    }

    return dataParsed as GeneralDataResponseType
  }
}

export const reportsServices = new ReportsServices()
