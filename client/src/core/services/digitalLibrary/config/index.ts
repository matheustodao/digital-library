import { AuthConfigParams, AuthLoginParams } from '@type/digitalLibrary/auth'
import { digitalLibraryApi } from 'src/core/infra/Apis/digitalLibraryApi'
import HttpClient from 'src/core/infra/HttpClient'

import { LoginConfigUseCase, loginConfigUseCase } from './usecases/login'
import { createConfigUseCase, CreateConfigUseCase } from './usecases/create'
import { UpdateConfigUseCase, updateConfigUseCase } from './usecases/update'

export class ConfigServices {
  readonly httpClient: HttpClient
  protected usecase: {
    update: UpdateConfigUseCase
    create: CreateConfigUseCase
    login: LoginConfigUseCase
  }

  constructor() {
    this.httpClient = digitalLibraryApi
    this.usecase = {
      update: updateConfigUseCase,
      create: createConfigUseCase,
      login: loginConfigUseCase
    }
  }

  async login(data: AuthLoginParams) {
    const validData = this.usecase.login.handleParams(data)

    return await this.httpClient.post({
      path: '/login',
      data: validData
    })
  }

  async register(data: AuthConfigParams) {
    const validData = this.usecase.create.handleParams(data)

    return await this.httpClient.post({
      path: '/config',
      data: validData
    })
  }

  async update(data: AuthConfigParams, original: AuthConfigParams) {
    const validData = this.usecase.update.handleParams(data, original)

    return await this.httpClient.patch({
      path: '/config',
      data: validData
    })
  }
}

export const configServices = new ConfigServices()
