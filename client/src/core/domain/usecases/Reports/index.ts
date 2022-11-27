import { ReportByMonthLoanUseCase } from './usecases/ByMonth'
import { ReportTopBookCategoriesUseCase } from './usecases/topCategories'

interface ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase
  readonly topCategories: ReportTopBookCategoriesUseCase
}

export class ReportController implements ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase
  readonly topCategories: ReportTopBookCategoriesUseCase

  constructor() {
    this.byMonthLoan = new ReportByMonthLoanUseCase()
    this.topCategories = new ReportTopBookCategoriesUseCase()
  }
}
