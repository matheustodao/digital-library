import * as yup from 'yup'

export const createBookLoanValidationSchema = yup.object().shape({
  isStudent: yup.boolean().default(true),
  personName: yup.string().required(),

  bookId: yup.mixed()
    .nullable()
    .transform((option) => {
      console.log('yup:', option?.value)
      return 12332
    })
    .required(),

  deliveryDate: yup.mixed().transform((date: Date) => date.toISOString()).nullable().required(),

  exitDate: yup.date()
    .default(new Date())
    .transform((date: Date | undefined) => date?.toISOString())
    .notRequired(),

  // Student field required
  class: yup.string()
    .when('isStudent', {
      is: (isStudent: boolean) => isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  teacherName: yup.string()
    .when('isStudent', {
      is: (isStudent: boolean) => isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  // Employee field required
  email: yup.string()
    .when('isStudent', {
      is: (isStudent: boolean) => !isStudent,
      then: (rule) => rule.email({ message: 'Digite um e-mail válido' }).required(),
      otherwise: (rule) => rule.transform(() => null)
    }),

  phone: yup.string()
    .when('isStudent', {
      is: (isStudent: boolean) => !isStudent,
      then: (rule) => rule.required(),
      otherwise: (rule) => rule.transform(() => null)
    })
})
