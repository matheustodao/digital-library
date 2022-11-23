import { useCallback, useEffect, useRef, useState } from 'react'
import { CaretRight } from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Flex,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

import BookView from '@components/Book/View'
import { BookViewContent } from '@components/Book/View/components/BookContent'
import HeaderNavigationAbout from '@components/pages/About/HeaderAboutNavigation'

import { booksServices } from '@services/books'
import { BookParams, NewBookParams } from '@type/book'
import Title from '@components/pages/Title'
import { FormBook } from '@components/Book/Form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateBookSchemaValidation } from '@validations/yup/digitalLibrary/book/update'
import { toast } from 'react-toastify'

export default function AboutBook() {
  const params = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState({} as BookParams)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const finalRef = useRef(null)
  const currentBgColor = useColorModeValue('white', 'gray.800')
  const bookBeingEditedMethodsForm = useForm<NewBookParams>({
    resolver: yupResolver(updateBookSchemaValidation),
    mode: 'onBlur'
  })

  const loadBookInfo = useCallback(async () => {
    const data = await booksServices.show(params.id as string)
    setBook(data)
    setIsLoading(false)

    bookBeingEditedMethodsForm.reset({
      ...data,
      authors: data.authors.join(', '),
      categories: data.categories.join(', ')
    })
  }, [params.id])

  async function handleDeleteBookById() {
    await booksServices.delete(book.id)
    navigate('/books')
  }

  async function handleUpdateBook(data: NewBookParams) {
    try {
      const updated = await booksServices.update(book.id, data, book)
      setBook(updated)
      onCloseEditModal()
    } catch {
      toast.error('Aconteceu algum erro, tente novamente mais tarde')
    }
  }

  useEffect(() => {
    loadBookInfo()
  }, [loadBookInfo])

  if (isLoading) return <h1>Carregando...</h1>

  return (
    <Stack maxW="896px" w="100%" mx="auto" width="100%" my="16" gap="32" ref={finalRef}>

      <HeaderNavigationAbout
        onEdit={onOpenEditModal}
        onDelete={handleDeleteBookById}
      />

      <BookView book={book}>
        {book.description && (
          <BookViewContent.Container>
            <Button variant="unstyled" h="min-content" onClick={onOpen}>
              <BookViewContent.Title>
                <Flex alignItems="center">
                  Descrição
                  <CaretRight />
                </Flex>
              </BookViewContent.Title>
            </Button>

            <BookViewContent.Text noOfLines={3}>
              {book.description}
            </BookViewContent.Text>
          </BookViewContent.Container>
        )}
      </BookView>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="orange.500" fontSize="3xl">Descrição</ModalHeader>
          <ModalCloseButton color="orange.500" size="lg" />
          <ModalBody>
            <Text lineHeight={2}>
              {book.description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal} size="6xl">
        <ModalContent bgColor={currentBgColor} as="form" noValidate onSubmit={bookBeingEditedMethodsForm.handleSubmit(handleUpdateBook)}>
          <ModalHeader
            position="sticky" top="20px" left="0" maxW="1300px" mx="auto" p="5" borderRadius="sm" bgColor={currentBgColor} zIndex="sticky" mb="12"
            w="full" display="flex" alignItems="center" justifyContent="space-around" flexWrap="wrap" gap="34px" mt="42px"
          >
            <ModalCloseButton size="lg" />
            <Title noOfLines={1} my="0">Editar livro: {book.title}</Title>

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
    </Stack>
  )
}
