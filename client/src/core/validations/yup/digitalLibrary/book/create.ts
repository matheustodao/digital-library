import * as yup from 'yup'

export const createBookSchemaValidation = yup.object().shape({
  title: yup.string().required(),
  tumble: yup.string().required(),
  authors: yup.string().required(),
  categories: yup.string().required(),
  publishingCompany: yup.string().required(),
  quantity: yup.number().required().min(1).positive().default(1),
  cover: yup.string(),
  description: yup.string(),
  isbn: yup.string()
})
