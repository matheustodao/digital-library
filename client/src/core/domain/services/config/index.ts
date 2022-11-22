import { AuthConfigParams, AuthLoginParams } from '@type/digitalLibrary/auth'

import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'
import { ConfigController } from '@usecases/Config'

export class ConfigServices extends HttpClientDigitalLibrary {
  protected usecase: ConfigController

  constructor() {
    super()
    this.usecase = new ConfigController()
  }

  async login(data: AuthLoginParams) {
    const validData = this.usecase.login.handleParams(data)

    return this.httpClient.post({
      path: '/login',
      data: validData
    })
  }

  async register(data: AuthConfigParams) {
    const validData = this.usecase.create.handleParams(data)

    return this.httpClient.post({
      path: '/config',
      data: validData
    })
  }

  async update(data: AuthConfigParams, original: AuthConfigParams) {
    const validData = this.usecase.update.handleParams(data, original)

    return this.httpClient.patch({
      path: '/config',
      data: validData
    })
  }
}

export const configServices = new ConfigServices()
