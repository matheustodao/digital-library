import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import { CaretLeft } from 'phosphor-react'
import { createBookLoanValidationSchema } from '@validations/yup/digitalLibrary/bookLoan'

import Title from '@components/pages/Title'

import StepMainForm from './components/StepForms/Main'
import StudentForm from './components/StepForms/StudentForm'
import EmployeeForm from './components/StepForms/EmployeeForm'
import { NewBookParams } from '@type/book'
import { bookLoanServices } from '@services/bookLoan'

export default function NewBookLoanPage() {
  const navigation = useNavigate()
  const iconColor = useColorModeValue('gray.500', 'gray.300')
  const methods = useForm<NewBookParams>({
    resolver: yupResolver(createBookLoanValidationSchema),
    mode: 'onBlur',
    defaultValues: {
      isStudent: true
    }
  })
  const isStudent = Boolean(methods.watch('isStudent'))

  async function onRegisterBookLoan(data: any) {
    try {
      const response = await bookLoanServices.create(data)
      navigation(`/loans/${response.id}`)
    } catch {
      console.error('Happened an error')
    }
  }

  return (
    <Stack margin="auto" maxW="866px" width="100%" spacing={12} mt="12px">
      <Button
        onClick={() => navigation(-1)}
        display="flex"
        alignItems="center" justifyContent="flex-start"
        variant="unstyled"
        gap={2}
      >
        <Icon
          as={CaretLeft}
          w="40px"
          h="40px"
          color={iconColor}
        />
        <Title lineHeight="none" margin={0}>Novo Empréstimo</Title>
      </Button>
      <Stack spacing={12}>

      <FormProvider {...methods}>
        <Stack as="form" spacing="10" noValidate onSubmit={methods.handleSubmit(onRegisterBookLoan)}>

          <StepMainForm />

          <Controller
            name="isStudent"
            control={methods.control}
            render={({ field }) => (
              <Checkbox
                maxW="200px"
                defaultChecked={isStudent}
                {...field}
              >
                Alugar para aluno
              </Checkbox>
            )}
          />

          {(isStudent) && <StudentForm />}
          {(!isStudent) && <EmployeeForm />}

          <Button
            type="submit"
            bgColor="orange.500"
            size="lg"
            textColor="white"
            transitionDelay=".23s"
            _hover={{ bg: 'orange.600' }}
            >
            Cadastrar
          </Button>
        </Stack>
      </FormProvider>

      </Stack>
    </Stack>
  )
}
