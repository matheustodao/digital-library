import { ReportByMonthLoanUseCase } from './usecases/ByMonth'

interface ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase
}

export class ReportController implements ReportControllerInterface {
  readonly byMonthLoan: ReportByMonthLoanUseCase

  constructor() {
    this.byMonthLoan = new ReportByMonthLoanUseCase()
  }
}
