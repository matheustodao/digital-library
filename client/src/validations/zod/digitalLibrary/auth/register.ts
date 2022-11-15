import * as yup from 'yup'

export const registerSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  emailBackup: yup.string().email().notRequired(),
  password: yup.string().required(),
  name: yup.string().required()
})
