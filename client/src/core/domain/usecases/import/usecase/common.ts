import { ImportParams } from '@type/index'

export class CommonMethodsUseCase {
  handleData(data: Omit<ImportParams, 'type'>, paramNameFile: string = 'file') {
    const formData = new FormData()
    formData.append('keepData', data.keepData === 'maintain' ? '1' : '0')
    formData.append(paramNameFile, data.file[0])

    return formData
  }
}
