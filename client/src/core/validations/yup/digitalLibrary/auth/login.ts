import * as yup from 'yup'
import '../../locales'

export const loginSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})
