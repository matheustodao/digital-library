import '@validations/yup/locales'
import * as yup from 'yup'

export const importSchemaValidation = yup.object({
  type: yup.mixed().transform((option) => option.value).required(),
  keepData: yup.string().required(),
  file: yup.mixed().required()
})
