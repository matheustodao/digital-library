import MissingParam from '@infra/errors/MissingParam'
import { NewBookParams } from '@type/book'

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
        return Object.assign(validParams, { [key]: value.trim().split(',') })
      }

      Object.assign(validParams, { [key]: value.trim() })
    })

    return validParams
  }
}
