'use-strict'
import * as yup from 'yup'
import '../../locales'

export const createBookLoanValidationSchema = yup.object().shape({
  isStudent: yup.boolean(),
  personName: yup.string().required(),

  bookId: yup.mixed()
    .nullable()
    .transform((option) => option.value)
    .required(),

  deliveryDate: yup.string().transform((option) => new Date(option).toISOString()).required(),

  exitDate: yup.string().transform((option) => {
    if (!option) {
      return new Date().toISOString()
    }

    return new Date(option).toISOString()
  }).optional().default(new Date().toISOString()),

  // Student field required
  class: yup.string()
    .nullable()
    .when('isStudent', {
      is: (isStudent: boolean) => isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  teacherName: yup.string()
    .nullable()
    .when('isStudent', {
      is: (isStudent: boolean) => isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  // Employee field required
  email: yup.string()
    .nullable()
    .when('isStudent', {
      is: (isStudent: boolean) => !isStudent,
      then: (rule) => rule.email({ message: 'Digite um e-mail válido' }).required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  phone: yup.string()
    .nullable()
    .when('isStudent', {
      is: (isStudent: boolean) => !isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    })
})
