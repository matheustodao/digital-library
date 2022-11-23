import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useColorModeValue
} from '@chakra-ui/react'

import Title from '@components/pages/Title'
import { FormBook } from '@components/Book/Form'
import { booksServices } from '@services/books'
import { BookParams, NewBookParams } from '@type/book'
import { updateBookSchemaValidation } from '@validations/yup/digitalLibrary/book/update'

interface ModalFormProps {
  disclosure: {
    isOpen: boolean
    onClose: () => void
  }
  bookBeingEdited: BookParams
  onSetBook: (data: BookParams) => void
}

export default function ModalBookForm({ bookBeingEdited, disclosure, onSetBook }: ModalFormProps) {
  const currentBgColor = useColorModeValue('white', 'gray.800')
  const bookBeingEditedMethodsForm = useForm<NewBookParams>({
    resolver: yupResolver(updateBookSchemaValidation),
    mode: 'onBlur'
  })

  async function handleUpdateBook(data: NewBookParams) {
    try {
      const updated = await booksServices.update(bookBeingEdited.id, data, bookBeingEdited)

      if (!updated) {
        return
      }

      onSetBook(updated)
      disclosure.onClose()
    } catch {
      toast.error('Aconteceu algum erro, tente novamente mais tarde')
    }
  }

  useEffect(() => {
    bookBeingEditedMethodsForm.reset({
      ...bookBeingEdited,
      authors: bookBeingEdited.authors.join(', '),
      categories: bookBeingEdited.categories.join(', ')
    })
  }, [])

  return (
    <Modal isOpen={disclosure.isOpen} onClose={() => disclosure.onClose()} size="6xl">
      <ModalContent bgColor={currentBgColor} as="form" noValidate onSubmit={bookBeingEditedMethodsForm.handleSubmit(handleUpdateBook)}>
        <ModalHeader
          position="sticky" top="20px" left="0" maxW="1300px" mx="auto" p="5" borderRadius="sm" bgColor={currentBgColor} zIndex="sticky" mb="12"
          w="full" display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap" gap="34px" mt="42px"
        >
          <ModalCloseButton size="lg" />
          <Title noOfLines={1} my="0">Editar livro: {bookBeingEdited.title}</Title>

          <Button
            type="submit"
            transition="all ease .25s"
            _hover={{ bgColor: 'orange.600' }}
            _active={{ bgColor: 'orange.500' }}
            bgColor="orange.500"
            size="lg"
          >
            Atualizar
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormProvider {...bookBeingEditedMethodsForm}>
            <FormBook />
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
