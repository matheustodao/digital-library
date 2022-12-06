import { loanStatus } from '@assets/locales/statusLoan'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import EmployeeForm from '@pages/BookLoan/new/components/StepForms/EmployeeForm'
import StepMainForm from '@pages/BookLoan/new/components/StepForms/Main'
import StudentForm from '@pages/BookLoan/new/components/StepForms/StudentForm'
import { bookLoanServices } from '@services/bookLoan'
import { BookLoanParams } from '@type/bookLoan'
import { updateBookLoanSchemaValidation } from '@validations/yup/digitalLibrary/bookLoan/update'
import { Select } from 'chakra-react-select'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const statusOptions: any[] = [
  { label: 'Sem Aviso', value: 'no_warning' },
  { label: '1º Aviso', value: 'first_warning' },
  { label: '2º Aviso', value: 'second_warning' },
  { label: '3º Aviso', value: 'third_warning' }
]

interface ModalBookLoanFormProps {
  bookLoaned: BookLoanParams
  onSetBookLoaned: (data: BookLoanParams) => void

  disclosure: {
    isOpen: boolean
    onClose: () => void
  }
}

export default function ModalBookLoanForm({ bookLoaned, onSetBookLoaned, disclosure }: ModalBookLoanFormProps) {
  const methods = useForm({
    resolver: yupResolver(updateBookLoanSchemaValidation)
  })
  const { handleSubmit, watch } = methods
  const isStudent = watch('isStudent')

  async function onUpdateBookLoan(data: any) {
    try {
      const response = await bookLoanServices.update(bookLoaned.id, data, bookLoaned)
      console.log({ response })
      onSetBookLoaned(response)
      toast.success('Atualizado com sucesso')
    } catch {
      toast.error('Aconteceu um erro, tente novamente mais tarde')
    } finally {
      disclosure.onClose()
    }
  }

  function resetFields() {
    methods.reset({
      ...bookLoaned,
      bookId: { label: bookLoaned.book.title, value: bookLoaned.book.id },
      status: {
        label: loanStatus[bookLoaned.status].translation['pt-br'],
        value: bookLoaned.status,
        color: loanStatus[bookLoaned.status].color
      }
    })
  }

  useEffect(() => {
    resetFields()
  }, [bookLoaned])

  return (
    <Modal isOpen={disclosure.isOpen} onClose={() => disclosure.onClose()} isCentered size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Title>Editar Empréstimo</Title>
          <ModalCloseButton />
        </ModalHeader>
          <FormProvider {...methods}>
            <Stack as="form" noValidate onSubmit={handleSubmit(onUpdateBookLoan)}>
              <ModalBody>
                <Stack spacing={12}>
                  <Stack as="form" spacing="10">
                    <StepMainForm />

                    {(isStudent) && <StudentForm />}
                    {(!isStudent) && <EmployeeForm />}

                    <Controller
                      name="status"
                      control={methods.control}
                      render={({ field }) => (
                        <Select
                          options={statusOptions}
                          focusBorderColor="orange.500"
                          errorBorderColor="red"
                          {...field}
                        />
                      )}
                    />
                  </Stack>
                </Stack>
              </ModalBody>

              <ModalFooter gap="12px">
                <Button type="button" onClick={() => disclosure.onClose()} size="lg">
                  Fechar
                </Button>

                <Button
                  type="submit"
                  bgColor="orange.500"
                  size="lg"
                  textColor="white"
                  transitionDelay=".23s"
                  _hover={{ bg: 'orange.600' }}
                  >
                  Atualizar
                </Button>
              </ModalFooter>
            </Stack>
          </FormProvider>
      </ModalContent>
    </Modal>
  )
}
