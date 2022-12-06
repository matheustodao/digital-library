import { ReportByMonthLoanUseCase } from './usecases/ByMonth'
import { ReportGeneralDataUseCase } from './usecases/generalData'
import { ReportTopBookCategoriesUseCase } from './usecases/topCategories'

interface ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase
  readonly topCategories: ReportTopBookCategoriesUseCase
  readonly generalData: ReportGeneralDataUseCase
}

export class ReportController implements ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase
  readonly topCategories: ReportTopBookCategoriesUseCase
  readonly generalData: ReportGeneralDataUseCase

  constructor() {
    this.byMonthLoan = new ReportByMonthLoanUseCase()
    this.topCategories = new ReportTopBookCategoriesUseCase()
    this.generalData = new ReportGeneralDataUseCase()
  }
}
