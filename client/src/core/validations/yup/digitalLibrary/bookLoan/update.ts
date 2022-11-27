import * as yup from 'yup'
import { createBookLoanValidationSchema } from '.'
import '../../locales'

export const updateBookLoanSchemaValidation = yup.object().shape({
  status: yup.mixed().transform((option) => typeof option === 'string' ? option : option?.value)
}).concat(createBookLoanValidationSchema.optional())
