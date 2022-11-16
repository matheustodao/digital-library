import { FormProvider, useForm } from 'react-hook-form'
import { FormBook } from '@components/Book/Form'

export default function NewBookPage() {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form>
        <FormBook />
      </form>
    </FormProvider>
  )
}
