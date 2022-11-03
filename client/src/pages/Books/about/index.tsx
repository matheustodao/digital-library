import { Flex, Button, Stack, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react'
import { CaretRight } from 'phosphor-react'

import BookView from 'src/components/Book/View'
import { BookViewContent } from 'src/components/Book/View/components/BookContent'
import HeaderNavigationAbout from 'src/components/pages/About/HeaderAboutNavigation'

import books from '@mocks/books.json'
import { useRef } from 'react'

export default function AboutBook() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)

  return (
    <Stack maxW="896px" w="100%" mx="auto" width="100%" my="16" gap="32" ref={finalRef}>
      <HeaderNavigationAbout onEditionClick={() => console.log('open')} />
      <BookView book={books.results[0]}>
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
            {books.results[0].description}
          </BookViewContent.Text>
        </BookViewContent.Container>
      </BookView>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="orange.500" fontSize="3xl">Descrição</ModalHeader>
          <ModalCloseButton color="orange.500" size="lg" />
          <ModalBody>
            <Text lineHeight={2}>
              {books.results[0].description}
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
