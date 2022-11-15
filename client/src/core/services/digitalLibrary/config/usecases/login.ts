import { AuthLoginParams } from '@type/digitalLibrary/auth'

export class LoginConfigUseCase {
  handleParams(params: AuthLoginParams) {
    if (!params.email) {
      throw Error('Missing e-mail field')
    }

    if (!params.password) {
      throw Error('Missing password field')
    }

    const validParams = params

    return validParams
  }
}

export const loginConfigUseCase = new LoginConfigUseCase()
