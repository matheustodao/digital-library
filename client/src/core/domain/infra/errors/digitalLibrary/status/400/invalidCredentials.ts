import { toast } from 'react-toastify'

import { factoryError } from '../factoryError'

export function invalidCredentials(_error: any) {
  const error = factoryError(_error)

  toast.error(`Ops, ${error.message}`)
}
