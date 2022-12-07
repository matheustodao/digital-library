import '@validations/yup/locales'
import * as yup from 'yup'

export const exportSchemaValidation = yup.object({
  content: yup.mixed().transform((option) => option.value).required(),
  format: yup.mixed().transform((option) => option.value).required()
})
