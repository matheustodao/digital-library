import { AuthConfigParams } from '@type/digitalLibrary/auth'

export class UpdateConfigUseCase {
  handleParams(params: AuthConfigParams, originalParams: AuthConfigParams) {
    const validParams = Object.entries(params).map(([key, value]) => {
      if (originalParams[key as keyof AuthConfigParams] === value) return null

      return value
    })

    return validParams
  }
}

export const updateConfigUseCase = new UpdateConfigUseCase()
