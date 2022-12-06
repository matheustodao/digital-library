import { GraphPieType } from '@type/lib/nivo'

export class ReportGeneralDataUseCase {
  formatToPieGraphNivo(name: string, value: number) {
    const parsed: GraphPieType = {
      id: name,
      value
    }

    return parsed
  }
}
