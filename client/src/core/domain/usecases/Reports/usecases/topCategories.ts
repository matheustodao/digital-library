import { GraphPieType } from '@type/lib/nivo'
import { TopCategoriesType } from '@type/reports'

export class ReportTopBookCategoriesUseCase {
  formatToPieGraphNivo(data: TopCategoriesType) {
    const parsed: GraphPieType[] = data.map((currentItem) => {
      return {
        id: currentItem.name,
        value: currentItem.amount
      }
    })

    return parsed
  }
}
