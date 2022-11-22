import { CreateConfigUseCase } from './usecases/create'
import { LoginConfigUseCase } from './usecases/login'
import { UpdateConfigUseCase } from './usecases/update'

interface ConfigControllerInterface {
  readonly update: UpdateConfigUseCase
  readonly create: CreateConfigUseCase
  readonly login: LoginConfigUseCase
}

export class ConfigController implements ConfigControllerInterface {
  public readonly update: UpdateConfigUseCase
  public readonly create: CreateConfigUseCase
  public readonly login: LoginConfigUseCase

  constructor() {
    this.update = new UpdateConfigUseCase()
    this.create = new CreateConfigUseCase()
    this.login = new LoginConfigUseCase()
  }
}
