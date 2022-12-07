import '@validations/yup/locales'
import * as yup from 'yup'
import { createBookSchemaValidation } from './create'

export const updateBookSchemaValidation = yup.object().concat(createBookSchemaValidation.optional())
