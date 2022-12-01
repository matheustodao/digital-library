import * as yup from 'yup'
import '../../locales'

export const updateConfigSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  emailBackup: yup.string().email().optional(),
  password: yup.string().optional(),
  name: yup.string().required()
})
