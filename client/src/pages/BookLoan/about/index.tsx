import {
  Box,
  Button,
  Flex,
  Image,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react'
import { CaretRight, Circle, List, User } from 'phosphor-react'
import { BookViewContent } from '@components/Book/View/components/BookContent'
import HeaderNavigationAbout from '@components/pages/About/HeaderAboutNavigation'

import { loanStatus } from '@locales/statusLoan'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bookLoanServices } from '@services/bookLoan'
import { BookLoanParams } from '@type/bookLoan'
import ModalBookLoanForm from './components/ModalBookLoanForm'
import BookLoader from '@components/Loader'

const formatDateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
}

export default function AboutLoanedBook() {
  const [loan, setLoan] = useState(null as BookLoanParams | null)
  const params = useParams()
  const navigate = useNavigate()
  const [isSmallThan900] = useMediaQuery('(max-width: 900px)')
  const [isSmallThan395] = useMediaQuery('(max-width: 395px)')
  const [isLoading, setIsLoading] = useState(true)
  const {
    isOpen: isOpenAuthorModal,
    onOpen: onOpenAuthorModal,
    onClose: onCloseAuthorModal
  } = useDisclosure()
  const {
    isOpen: isOpenEditLoan,
    onOpen: onOpenEditLoan,
    onClose: onCloseEditLoan
  } = useDisclosure()

  const loadBookLoanedInformation = useCallback(async () => {
    try {
      const data = await bookLoanServices.show(params.id as string)
      setLoan(data)
    } finally {
      setIsLoading(false)
    }
  }, [params.id])

  async function handleDeleteBookLoanedById() {
    if (!loan) return null

    await bookLoanServices.delete(loan.id)
    navigate('/loans')
  }

  useEffect(() => {
    loadBookLoanedInformation()
  }, [loadBookLoanedInformation])

  if (isLoading || !loan) return <BookLoader />

  return (
    <Stack maxW="900px" w="100%" mx="auto" width="100%" my="16" gap="32">
      <HeaderNavigationAbout
        onEdit={() => onOpenEditLoan()}
        onDelete={handleDeleteBookLoanedById}
        pathGoBack="/loans"
        messageDelete="Tem certeza que deseja deletar esse empréstimo?"
      />

      <Box>
        <Flex
          direction={isSmallThan900 ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          gap="24px"
        >
          <Box>
            <Image
              width="100%"
              maxH="525px"
              h="525px"
              w="345px"
              src={loan.book.cover}
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/525"
              alt={loan.book.title}
              borderTopRadius="md"
            />
          </Box>

          <Flex direction="column" h="full" gap="32px" maxW="479px" w="full">
            <BookViewContent.Container>
              <BookViewContent.Title>Titulo do livro</BookViewContent.Title>
              <BookViewContent.Text fontSize="32" fontWeight="300">{loan.book.title}</BookViewContent.Text>
            </BookViewContent.Container>

            <SimpleGrid columns={isSmallThan395 ? 1 : 2} rowGap="8" width="full" columnGap={{ sm: '10', md: '20%' }}>
              <BookViewContent.Container>
                {loan.book.authors.length > 1 && (
                  <Button variant="unstyled" h="min-content" onClick={onOpenAuthorModal}>
                    <BookViewContent.Title noOfLines={1}>
                      <Flex alignItems="center">
                        Autores
                        <CaretRight />
                      </Flex>
                    </BookViewContent.Title>
                  </Button>
                )}

                {loan.book.authors.length === 1 && (
                  <BookViewContent.Title>Autor</BookViewContent.Title>
                )}

                {loan.book.authors.slice(0, 1).map((author) => (
                  <BookViewContent.Text
                    key={author}
                    fontWeight="300"
                    fontSize="16"
                    noOfLines={1}
                  >
                    {author}
                  </BookViewContent.Text>
                ))}
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Editora</BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>{loan.book.publishingCompany}</BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Alugado para</BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>{loan.personName}</BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Tombo</BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>{loan.book.tumble}</BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Data de Retirada</BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>
                  {new Date(loan.exitDate).toLocaleDateString('pt-br', formatDateOptions)}
                </BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Data de Entrega</BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>
                  {new Date(loan.deliveryDate).toLocaleDateString('pt-br', formatDateOptions)}
                </BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>Status</BookViewContent.Title>
                <BookViewContent.Text display="flex" alignItems="center" gap="2">
                  <Circle size={24} weight="fill" color={loanStatus[loan.status].color} />
                  {loanStatus[loan.status].translation['pt-br']}
                </BookViewContent.Text>
              </BookViewContent.Container>

              <BookViewContent.Container>
                <BookViewContent.Title>
                  {loan.class && 'Sala'}
                  {loan.phone && 'Contato'}
                </BookViewContent.Title>
                <BookViewContent.Text noOfLines={1}>
                  {loan.class && loan.class}
                  {loan.phone && loan.phone}
                </BookViewContent.Text>
              </BookViewContent.Container>
            </SimpleGrid>
          </Flex>
        </Flex>

        <Modal isOpen={isOpenAuthorModal} onClose={onCloseAuthorModal} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="orange.500" fontSize="3xl">Autores</ModalHeader>
            <ModalCloseButton color="orange.500" size="lg" />
            <ModalBody>
              <List spacing={3}>
                {loan.book.authors.map((author) => (
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

      <ModalBookLoanForm
        bookLoaned={loan}
        onSetBookLoaned={(data) => setLoan(data)}
        disclosure={{
          isOpen: isOpenEditLoan,
          onClose: onCloseEditLoan
        }}
      />
      </Box>
    </Stack>
  )
}
