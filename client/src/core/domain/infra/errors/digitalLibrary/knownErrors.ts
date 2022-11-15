export interface knownErrors { error: string, message: string }

export const knownErrorsDigitalLibrary: knownErrors[] = [
  {
    error: 'seu cadastro não corresponde a essas credenciais',
    message: 'credenciais inválidas'
  },

  {
    error: 'sua senha não corresponde',
    message: 'credenciais inválidas'
  },

  {
    error: 'unknown',
    message: 'aconteceu um erro inesperado'
  }
]
