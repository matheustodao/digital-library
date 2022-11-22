import { AuthConfigParams, AuthLoginParams } from '@type/digitalLibrary/auth'

import { LoginConfigUseCase, loginConfigUseCase } from './usecases/login'
import { createConfigUseCase, CreateConfigUseCase } from './usecases/create'
import { UpdateConfigUseCase, updateConfigUseCase } from './usecases/update'
import { HttpClientDigitalLibrary } from '@infra/Apis/digitalLibraryApi'

export class ConfigServices extends HttpClientDigitalLibrary {
  protected usecase: {
    update: UpdateConfigUseCase
    create: CreateConfigUseCase
    login: LoginConfigUseCase
  }

  constructor() {
    super()
    this.usecase = {
      update: updateConfigUseCase,
      create: createConfigUseCase,
      login: loginConfigUseCase
    }
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
