import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputProps
} from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'

interface FieldInputGroupProps {
  label: string
  name: string

  description?: ReactNode
  required?: boolean

  _inputProps?: InputProps
}

export function FieldInputGroup({ label, name, description, required = false, _inputProps }: FieldInputGroupProps) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <FormControl isInvalid={!!errors?.[name]} h="145px">
      <FormLabel>
        <Flex alignItems="center" h="30px">
          {label}
          {required && <RequiredAsterisk />}
        </Flex>
      </FormLabel>

      <Input
        size="lg"
        {..._inputProps}
        {...register(name)}
      />

      {!!errors?.[name] && (
        <FormErrorMessage>
          {
            // @ts-ignore
            errors[name].message as string
          }
        </FormErrorMessage>
      )}

      {description && (
        <FormHelperText>
          {description}
        </FormHelperText>
      )}
    </FormControl>
  )
}
