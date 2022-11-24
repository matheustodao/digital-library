'use-strict'
import * as yup from 'yup'
import '../../locales'

export const createBookLoanValidationSchema = yup.object().shape({
  isStudent: yup.boolean(),
  personName: yup.string().required(),

  bookId: yup.mixed()
    .nullable()
    .transform((option) => {
      return 12332
    })
    .required(),

  deliveryDate: yup.string().required(),

  exitDate: yup.date().default(new Date()).optional(),

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
