import * as yup from 'yup'

export const loginSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})
