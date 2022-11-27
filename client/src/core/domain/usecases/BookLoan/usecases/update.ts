import { BookLoanParams, UpdateBookLoanParams } from '@type/bookLoan'

export class UpdateBookLoanedUseCase {
  handleParams(newValues: UpdateBookLoanParams, originalValues?: BookLoanParams) {
    if (!originalValues) return newValues

    const fieldsUpdated = {}

    Object.entries(newValues).forEach(([key, value]) => {
      if (key === 'status') {
        if (originalValues.status === newValues.status) return null
        Object.assign(fieldsUpdated, { [key]: value })
      }

      if (originalValues[key as never] === value) {
        return null
      }

      if (originalValues.book) return null

      Object.assign(fieldsUpdated, { [key]: value })
    })

    return fieldsUpdated
  }
}
