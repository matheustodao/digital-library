import { ImportParams } from '@type/index'

export class CommonMethodsUseCase {
  handleData(data: Omit<ImportParams, 'type'>) {
    const formData = new FormData()
    formData.append('keepData', data.keepData === 'maintain' ? '1' : '0')
    formData.append('file', data.file[0])

    return formData
  }
}
