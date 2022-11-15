import * as yup from 'yup'

const localeErrors = yup.setLocale({
  string: {
    email: 'Formato de e-mail inválido'
  },

  mixed: {
    required: 'Campo obrigatório'
  }
})

export default localeErrors
