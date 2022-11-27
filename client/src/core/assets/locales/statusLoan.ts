import { LoanBookStatus } from '@type/bookLoan/index'

interface TContentStatusParam {
  color: string
  translation: {
    'pt-br': string
  }
}

export type LoanStatusParams = {
  [key in LoanBookStatus]: TContentStatusParam
}

export const loanStatus: LoanStatusParams = {
  no_warning: {
    color: '#99CF63',
    translation: {
      'pt-br': 'Sem Aviso'
    }
  },

  first_warning: {
    color: '#FBED6A',
    translation: {
      'pt-br': '1º aviso'
    }
  },

  second_warning: {
    color: '#FBB06A',
    translation: {
      'pt-br': '2º aviso'
    }
  },

  third_warning: {
    color: '#FC8A8A',
    translation: {
      'pt-br': '3º aviso'
    }
  }
}
