import MissingParam from '@infra/errors/MissingParam'
import { AuthConfigParams } from '@type/auth'

export class UpdateConfigUseCase {
  handleParams(params: AuthConfigParams, originalParams?: AuthConfigParams) {
    if (!params.email) {
      throw new MissingParam('Email')
    }

    if (!params.name) {
      throw new MissingParam('Name')
    }

    if (!originalParams) return params

    const validParams = {}

    Object.entries(params).map(([key, value]) => {
      if (originalParams[key as keyof AuthConfigParams] === value) return null

      return Object.assign(validParams, { [key]: value })
    })

    return JSON.stringify(validParams) === '{}' ? null : validParams
  }
}
