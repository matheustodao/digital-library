import { GraphLineType } from '@type/lib/nivo'
import { ByMonthParams } from '@type/reports'

const translationId = {
  student: 'Alunos',
  employee: 'Funcionários'
}

export class ReportByMonthLoanUseCase {
  formatToLineGraphNivo(data: ByMonthParams) {
    const parsed: GraphLineType[] = data.map((currentItem) => {
      const parsedData = currentItem.data.map((currentValue) => ({
        x: currentValue.month,
        y: currentValue.amount
      }))

      return {
        id: translationId[currentItem.id],
        data: parsedData
      }
    })

    return parsed
  }
}
