import { useFormContext } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'

export default function FieldName() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <FormControl isInvalid={!!errors?.personName}>
      <FormLabel>
        Nome Completo
        <RequiredAsterisk />
      </FormLabel>
      <Input placeholder="ex: João Henrique Alves" {...register('personName')} />
      {errors?.personName && (
        <FormErrorMessage>
          {errors.personName.message as string}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}
