import { z as zod } from 'zod'

// interface IReactSelectOption {
//   label: string
//   value: string
// }

// const commonMessageErrors = { invalid_type_error: 'Campo obrigatório' }

const commonSchemaValidation = zod.object({
  personName: zod.string({
    required_error: 'Campo obrigatorio',
    description: 'Person name need have a value'
  }).min(1, { message: 'Campo obrigatório' }),

  bookId: zod.any({ required_error: 'Livro é obrigatório' })
    .transform((option) => {
      console.log('zod:', option?.value)
      return option?.value
    }),

  deliveryDate: zod.date({ required_error: 'Campo obrigatório' }).transform(async (date: Date) => {
    const dateAsIsoPattern = date.toISOString()
    console.log({ dateAsIsoPattern })
    return dateAsIsoPattern
  }),

  exitDate: zod.date()
    .transform((date: Date | undefined) => date?.toISOString())
    .nullable()
    .default(new Date())
    .optional()
})

const createBookLoanForStudent = zod.object({
  isStudent: zod.literal(true),
  class: zod.string(),
  teacherName: zod.string()
}).merge(commonSchemaValidation)

const createBookLoanForEmployee = zod.object({
  isStudent: zod.literal(false),
  email: zod.string().email({ message: 'Digite um e-mail válido' }).min(1, { message: 'Campo obrigatório' }),
  phone: zod.string()
}).merge(commonSchemaValidation)

export const createBookLoanValidationSchema = zod.discriminatedUnion('isStudent', [
  createBookLoanForEmployee,
  createBookLoanForStudent
])
