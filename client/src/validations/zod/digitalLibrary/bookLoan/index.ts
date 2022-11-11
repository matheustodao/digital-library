import zod from 'zod'

interface IReactSelectOption {
  label: string
  value: string
}

const commonMessageErrors = { required_error: 'Campo obrigatório' }

export const createBookLoanValidationSchema = zod.object({
  isStudent: zod.enum(['true', 'false']).default('true'),

  personName: zod.string(commonMessageErrors),
  bookId: zod.any({ required_error: 'Livro é obrigatório' })
    .transform<IReactSelectOption>((option) => option.value),

  class: zod.string().optional(),
  teacherName: zod.string().optional(),

  email: zod.string().optional(),
  phone: zod.string().optional(),

  deliveryDate: zod.date(commonMessageErrors).transform((date: Date) => date.toISOString()),

  exitDate: zod.date().transform((date: Date | undefined) => date?.toISOString())

}).superRefine((data, ctx) => {
  if (data.isStudent) {
    ctx.addIssue({
      path: ['class', 'teacherName'],
      fatal: true,
      code: zod.z.ZodIssueCode.custom
    })
  }

  if (!data.isStudent) {
    ctx.addIssue({
      path: ['email', 'phone'],
      fatal: true,
      code: zod.z.ZodIssueCode.custom
    })
  }
})
