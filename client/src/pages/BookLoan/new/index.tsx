import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Flex, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import { CaretLeft, Circle } from 'phosphor-react'
import Title from '@components/pages/Title'

import booksMock from '@mocks/books.json'
import { BookParams } from '@type/digitalLibrary/book'
import { BookResponseParams } from '@type/digitalLibrary/response'
import StepMainForm from './components/StepForms/Main'

export default function NewBookLoanPage() {
  const navigation = useNavigate()
  const iconColor = useColorModeValue('gray.500', 'gray.300')
  const [stepForm, setStepForm] = useState(1)
  const [books] = useState(booksMock as BookResponseParams)
  const [bookBeingLoaned, setBookBeingLoaned] = useState<BookParams | undefined>()
  const optionsSelect = useMemo(() => books.results.map((currentBook) => ({
    label: currentBook.title,
    value: currentBook.id
  })), [])

  const handleGetBookInformation = useCallback((_id: string) => {
    const bookSelected = books.results.find((currentBook) => currentBook.id === _id)
    setBookBeingLoaned(bookSelected)
  }, [])

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
    handleGetBookInformation('123')
  }, [handleGetBookInformation])

  return (
    <Stack margin="auto" maxW="866px" width="100%" spacing={20} mt={32}>
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

        <StepMainForm bookBeingLoaned={bookBeingLoaned} optionsSelect={optionsSelect} />

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
      </Stack>
    </Stack>
  )
}
