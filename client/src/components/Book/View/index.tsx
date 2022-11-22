import {
  Flex,
  Box,
  Image,
  SimpleGrid,
  Tag,
  Button,
  useMediaQuery,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
  TagLabel
} from '@chakra-ui/react'

import { CaretRight, User, Asterisk } from 'phosphor-react'
import { ReactNode } from 'react'
import { BookParams } from '@type/book'
import { BookViewContent } from './components/BookContent'

interface IProps {
  children?: ReactNode
  book: BookParams
}

export default function BookView({ children, book }: IProps) {
  const [isSmallThan900] = useMediaQuery('(max-width: 900px)')
  const [isSmallThan395] = useMediaQuery('(max-width: 395px)')
  const {
    isOpen: isOpenAuthorModal,
    onOpen: onOpenAuthorModal,
    onClose: onCloseAuthorModal
  } = useDisclosure()

  const {
    isOpen: isOpenCategoryModal,
    onOpen: onOpenCategoryModal,
    onClose: onCloseCategoryModal
  } = useDisclosure()

  return (
    <Box>
      <Flex
        direction={isSmallThan900 ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
        gap="24px"
      >
        <Box position="relative">
          <Image
            width="100%"
            maxH="525px"
            h="525px"
            w="345px"
            src={book.cover}
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/525"
            alt={book.title}
            borderTopRadius="md"
          />
          <Tag position="absolute" bottom="2" right="2" size="lg" bg="orange.200" title="Quantidade de livros">
            <TagLabel fontSize="medium" color="gray.900" pointerEvents="none">
              {book.quantity}
            </TagLabel>
          </Tag>
        </Box>

        <Flex direction="column" h="full" gap="32px" maxW="479px" w="full">
          <BookViewContent.Container title={book.title}>
            <BookViewContent.Title>Titulo do livro</BookViewContent.Title>
            <BookViewContent.Text fontSize="32" fontWeight="300" noOfLines={2}>{book.title}</BookViewContent.Text>
          </BookViewContent.Container>

          <BookViewContent.Container>
            {book.categories.length > 5 && (
              <Button variant="unstyled" h="min-content" onClick={onOpenCategoryModal}>
                <BookViewContent.Title>
                  <Flex alignItems="center">
                    Categorias
                    <CaretRight />
                  </Flex>
                </BookViewContent.Title>
              </Button>
            )}

            {book.categories.length <= 5 && (
              <BookViewContent.Title>
                {book.categories.length === 1 ? 'categoria' : 'categorias'}
              </BookViewContent.Title>
            )}

            <Flex gap="8px" flexWrap="wrap">
              {book.categories.slice(0, 5).map((category) => (
                <Tag colorScheme="gray" key={category}>{category}</Tag>
              ))}
            </Flex>
          </BookViewContent.Container>

          <SimpleGrid columns={isSmallThan395 ? 1 : 2} rowGap="8" width="100%" columnGap={{ sm: '40', md: '50%' }}>
            <BookViewContent.Container>
              {book.authors.length > 1 && (
                <Button variant="unstyled" h="min-content" onClick={onOpenAuthorModal}>
                  <BookViewContent.Title>
                    <Flex alignItems="center">
                      Autores
                      <CaretRight />
                    </Flex>
                  </BookViewContent.Title>
                </Button>
              )}

              {book.authors.length === 1 && (
                <BookViewContent.Title>Autor</BookViewContent.Title>
              )}

              {book.authors.slice(0, 1).map((author) => (
                <BookViewContent.Text
                  key={author}
                  fontWeight="300"
                  fontSize="16"
                >
                    {author}
                </BookViewContent.Text>
              ))}
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Editora</BookViewContent.Title>
              <BookViewContent.Text>{book.publishingCompany}</BookViewContent.Text>
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Isbn</BookViewContent.Title>
              <BookViewContent.Text>{book.isbn}</BookViewContent.Text>
            </BookViewContent.Container>

            <BookViewContent.Container>
              <BookViewContent.Title>Tombo</BookViewContent.Title>
              <BookViewContent.Text>{book.tumble}</BookViewContent.Text>
            </BookViewContent.Container>
          </SimpleGrid>
          {children}
        </Flex>
      </Flex>

      <Modal isOpen={isOpenAuthorModal} onClose={onCloseAuthorModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="orange.500" fontSize="3xl">Autores</ModalHeader>
          <ModalCloseButton color="orange.500" size="lg" />
          <ModalBody>
            <List spacing={3}>
              {book.authors.map((author) => (
                <ListItem key={author}>
                  <ListIcon as={User} color="green.600" />
                  {author}
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onCloseAuthorModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenCategoryModal} onClose={onCloseCategoryModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="orange.500" fontSize="3xl">Categorias</ModalHeader>
          <ModalCloseButton color="orange.500" size="lg" />
          <ModalBody>
            <List spacing={3}>
              {book.categories.map((category) => (
                <ListItem key={category}>
                  <ListIcon as={Asterisk} color="green.600" />
                  {category}
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onCloseCategoryModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
