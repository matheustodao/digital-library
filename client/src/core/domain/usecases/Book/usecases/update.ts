import { BookParams, NewBookParams } from '@type/book'

export class UpdateBookUseCase {
  handleParams(newValues: NewBookParams, originalValues?: BookParams) {
    if (!originalValues) return newValues

    const fieldsUpdated = {}

    Object.entries(newValues).forEach(([key, value]) => {
      if (key === 'quantity') {
        console.log(typeof Number(value))
        return originalValues.quantity === Number(value)
          ? null
          : Object.assign(fieldsUpdated, { quantity: Number(value) })
      }

      if (originalValues[key as never] === value) {
        return null
      }

      if (key === 'categories' || key === 'authors') {
        if (originalValues[key].join().trim() === value.trim()) return null

        return Object.assign(fieldsUpdated, { [key]: value.split(',') })
      }

      Object.assign(fieldsUpdated, { [key]: value })
    })

    return fieldsUpdated
  }
}
