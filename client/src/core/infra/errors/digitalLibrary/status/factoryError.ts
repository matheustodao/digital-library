import { knownErrors, knownErrorsDigitalLibrary } from '../knownErrors'

export function factoryError(_error: any): knownErrors {
  const errorName = _error?.response?.data?.error

  const error = knownErrorsDigitalLibrary.find((knownError) => (
    knownError.error.replaceAll(' ', '') === errorName?.replaceAll(' ', '')
      ? knownError
      : knownError.error === 'unknown'
  ))

  return error as knownErrors
}
