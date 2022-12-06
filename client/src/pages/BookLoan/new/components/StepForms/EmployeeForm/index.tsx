import { Stack, Flex, FormControl, FormLabel, useMediaQuery, FormErrorMessage } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'

import FieldName from '../components/FieldName'
import formatPhone from '@helpers/formatPhone'
import { useState } from 'react'

export default function EmployeeForm() {
  const { register, formState: { errors }, control } = useFormContext()
  const [phone, setPhone] = useState('')
  const [isSmallThan500px] = useMediaQuery('(max-width: 500px)')

  return (
    <Stack spacing={12}>
      <FieldName />

      <Flex gap="5" direction={isSmallThan500px ? 'column' : 'row'}>
        <FormControl isInvalid={!!errors?.email}>
          <FormLabel>
            Email
            <RequiredAsterisk />
          </FormLabel>
          <Input placeholder="ex: exemplo@gmail.com" {...register('email')} type="email" />
          {errors?.email && <FormErrorMessage>{errors.email.message as string}</FormErrorMessage>}
        </FormControl>

        <Controller
          control={control}
          name="phone"
          rules={{ shouldUnregister: true }}
          render={({ field }) => (
            <FormControl isInvalid={!!errors?.phone}>
              <FormLabel>
                Celular
                <RequiredAsterisk />
              </FormLabel>
              <Input
                {...field}
                value={phone}
                placeholder="ex: (00) 00000-0000"
                maxLength="15"
                onChange={(e: { target: { value: string } }) => {
                  field.onChange(e)
                  setPhone(formatPhone(e.target.value))
                }}
              />
              {errors?.phone && <FormErrorMessage>{errors.phone.message as string}</FormErrorMessage>}
            </FormControl>
          )}
        />

      </Flex>
    </Stack>
  )
}
