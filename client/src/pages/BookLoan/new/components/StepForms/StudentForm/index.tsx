import { Stack, Flex, FormControl, FormLabel, useMediaQuery, FormErrorMessage } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'

import FieldName from '../components/FieldName'

export default function StudentForm() {
  const { register, formState: { errors } } = useFormContext()
  const [isSmallThan500px] = useMediaQuery('(max-width: 500px)')

  return (
    <Stack spacing={12}>
      <FieldName />

      <Flex gap="5" direction={isSmallThan500px ? 'column' : 'row'}>
        <FormControl isInvalid={!!errors?.class}>
          <FormLabel>
            Sala
            <RequiredAsterisk />
          </FormLabel>
          <Input placeholder="ex: 6ºB" {...register('class')} />
          {errors?.class && <FormErrorMessage>{errors.class.message as string}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors?.teacherName}>
          <FormLabel>
            Professor Responsável
            <RequiredAsterisk />
          </FormLabel>
          <Input placeholder="ex: Debora Silva" {...register('teacherName', { shouldUnregister: true })} />
          {errors?.teacherName && <FormErrorMessage>{errors.teacherName.message as string}</FormErrorMessage>}
        </FormControl>
      </Flex>
    </Stack>
  )
}
