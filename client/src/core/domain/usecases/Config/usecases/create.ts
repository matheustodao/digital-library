import { AuthConfigParams } from '@type/digitalLibrary/auth'

export class CreateConfigUseCase {
  handleParams(params: AuthConfigParams) {
    if (!params.email) {
      throw Error('Missing e-mail field')
    }

    if (!params.password) {
      throw Error('Missing password field')
    }

    if (!params.name) {
      throw Error('Missing name field')
    }

    const validParams = params

    return validParams
  }
}
