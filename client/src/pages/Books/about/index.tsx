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
  Text
} from '@chakra-ui/react'

import BookView from '@components/Book/View'
import { BookViewContent } from '@components/Book/View/components/BookContent'
import HeaderNavigationAbout from '@components/pages/About/HeaderAboutNavigation'

import { booksServices } from '@services/books'
import { BookParams } from '@type/book'
import ModalBookForm from './components/ModalBookForm'

export default function AboutBook() {
  const params = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState({} as BookParams)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const finalRef = useRef(null)

  const loadBookInfo = useCallback(async () => {
    const data = await booksServices.show(params.id as string)
    setBook(data)
    setIsLoading(false)
  }, [params.id])

  async function handleDeleteBookById() {
    await booksServices.delete(book.id)
    navigate('/books')
  }

  useEffect(() => {
    loadBookInfo()
  }, [loadBookInfo])

  if (isLoading) return <h1>Carregando...</h1>

  return (
    <Stack maxW="896px" w="100%" mx="auto" width="100%" my="16" gap="32" ref={finalRef}>

      <HeaderNavigationAbout
        pathGoBack="/books"
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

      <ModalBookForm
        bookBeingEdited={book}
        onSetBook={(data) => setBook(data)}
        disclosure={{
          isOpen: isOpenEditModal,
          onClose: onCloseEditModal
        }}
      />

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
    </Stack>
  )
}
