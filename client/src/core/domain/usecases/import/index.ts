import { CommonMethodsUseCase } from './usecase/common'

export interface ImportControllerType {
  readonly common: CommonMethodsUseCase
}

export class ImportController implements ImportControllerType {
  readonly common: CommonMethodsUseCase

  constructor() {
    this.common = new CommonMethodsUseCase()
  }
}
