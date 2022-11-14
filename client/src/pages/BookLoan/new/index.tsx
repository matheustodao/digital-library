import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Flex, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import { CaretLeft, Circle } from 'phosphor-react'
import { createBookLoanValidationSchema } from '@validations/zod/digitalLibrary/bookLoan'

import Title from '@components/pages/Title'

import booksMock from '@mocks/books.json'
import { BookParams } from '@type/digitalLibrary/book'
import { BookResponseParams } from '@type/digitalLibrary/response'
import StepMainForm from './components/StepForms/Main'
import StudentForm from './components/StepForms/StudentForm'

export default function NewBookLoanPage() {
  const navigation = useNavigate()
  const iconColor = useColorModeValue('gray.500', 'gray.300')
  const methods = useForm({
    resolver: zodResolver(createBookLoanValidationSchema),
    mode: 'all'
  })

  const bookId = methods.watch('bookId')?.value

  const [stepForm, setStepForm] = useState(1)
  const [books] = useState(booksMock as BookResponseParams)
  const [bookBeingLoaned, setBookBeingLoaned] = useState<BookParams | undefined>()
  const optionsSelect = useMemo(() => books.results.map((currentBook) => ({
    label: currentBook.title,
    value: currentBook.id
  })), [])

  const handleGetBookInformation = useCallback(() => {
    const bookSelected = books.results.find((currentBook) => currentBook.id === bookId)
    setBookBeingLoaned(bookSelected)
  }, [bookId])

  function handleChangeStepForm(action: 'next' | 'prev' | 'custom', step?: number) {
    if (action === 'custom' && step) {
      setStepForm(step)
    }

    if (action === 'next') {
      setStepForm((oldStep) => oldStep + 1)
    }

    if (action === 'prev') {
      setStepForm((oldStep) => oldStep === 1 ? 1 : oldStep - 1)
    }
  }

  useEffect(() => {
    handleGetBookInformation()
  }, [handleGetBookInformation])

  return (
    <Stack margin="auto" maxW="866px" width="100%" spacing={12} mt={32}>
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
        {stepForm === 1 && <StepMainForm bookBeingLoaned={bookBeingLoaned} optionsSelect={optionsSelect} />}

        {(stepForm === 2 || stepForm === 3) && (
          <>
            <Controller
              name="isStudent"
              control={methods.control}
              defaultValue={true}
              render={({ field }) => (
                <Checkbox defaultChecked={field.value} {...field}>
                  Alugar para Aluno
                </Checkbox>
              )}
            />

            <StudentForm />
          </>
        )}

        <Flex justifyContent="space-between" alignContent="center">

          <Button fontWeight="normal" onClick={() => handleChangeStepForm('prev')} disabled={stepForm === 1}>
            Anterior
          </Button>

          <Flex gap="5px" alignItems="center" justifyContent="center">
            <button onClick={() => handleChangeStepForm('custom', 1)}>
              <Icon
                as={Circle}
                w={4}
                h={4}
                color={stepForm === 1 ? 'orange.400' : 'InactiveBorder'}
                weight="fill"
              />
            </button>

            <button onClick={() => handleChangeStepForm('custom', 2)}>
              <Icon
                as={Circle}
                w={4}
                h={4}
                color={stepForm === 2 ? 'orange.400' : 'InactiveBorder'}
                weight="fill"
              />
            </button>
          </Flex>

          {stepForm === 1 && (
            <Button
              bgColor="orange.500"
              textColor="white"
              transitionDelay=".23s"
              _hover={{ bg: 'orange.600' }}
              onClick={() => handleChangeStepForm('next')}
              maxWidth="106px"
              w="100%"
            >
              Proximo
            </Button>
          )}

          {stepForm === 2 && (
            <Button
            type="submit"
              bgColor="orange.500"
              textColor="white"
              transitionDelay=".23s"
              _hover={{ bg: 'orange.600' }}
            >
              Cadastrar
            </Button>
          )}
        </Flex>
      </FormProvider>

      </Stack>
    </Stack>
  )
}
