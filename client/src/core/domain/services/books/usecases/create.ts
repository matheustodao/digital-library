import MissingParam from '@infra/errors/MissingParam'
import { NewBookParams } from '@type/digitalLibrary/book'

export class CreateBookUseCase {
  handleParams(params: NewBookParams) {
    const validParams = {}

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'isbn' || key === 'description' || key === 'cover') {
        Object.assign(validParams, { [key]: value ?? '' })
        return
      }

      if (!value) {
        throw new MissingParam(key)
      }

      if (key === 'quantity') {
        return Object.assign(validParams, { [key]: value === 0 ? 1 : Number(value) })
      }

      if (key === 'categories' || key === 'authors') {
        return Object.assign(validParams, { [key]: value.split(',') })
      }

      Object.assign(validParams, { [key]: value })
    })

    return validParams
  }
}

export const createBookUseCase = new CreateBookUseCase()
