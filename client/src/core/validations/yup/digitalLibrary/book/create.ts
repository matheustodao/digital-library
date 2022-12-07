import '@validations/yup/locales'
import * as yup from 'yup'

export const createBookSchemaValidation = yup.object().shape({
  title: yup.string().required(),
  tumble: yup.string().required(),
  authors: yup.string().required(),
  categories: yup.string().required(),
  publishingCompany: yup.string().required(),
  quantity: yup.string().required().test((value: any, ctx) => {
    if (Number(value) === 0) {
      return ctx.createError({ message: 'Quantidade de livros tem que ser diferente de zero ' })
    }

    if (Number(value) < 0) {
      return ctx.createError({ message: 'Quantidade de livros não pode ser negativa ' })
    }

    return value
  }),
  cover: yup.string(),
  description: yup.string(),
  isbn: yup.string()
})
