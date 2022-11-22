import { Button, Flex, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { ArrowLeft, PencilSimpleLine, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  onEdit: () => void
  onDelete: () => void
}

export default function HeaderNavigationAbout({ onEdit, onDelete }: IProps) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      <Button
        onClick={() => navigate(-1)}
        color="blackAlpha.700"
        bgColor="gray.200"
        _hover={{ bg: 'gray.300' }}
        size="lg"
        iconSpacing={6}
        leftIcon={<ArrowLeft size={32} />}
      >
        Voltar
      </Button>

      <Flex gap="12px">
        <Button
          onClick={() => onEdit()}
          size="lg"
          iconSpacing={6}
          leftIcon={<PencilSimpleLine size={32} />}
          _hover={{ bg: 'orange.600' }}
          bgColor="orange.500"
          color="white"
          fontWeight="semibold"
        >
          Editar
        </Button>

        <IconButton
          icon={<Trash />}
          onClick={onOpen}
          w="48px"
          h="48px"
          bgColor="red.500"
          _hover={{ bgColor: 'red.400' }}
          aria-label="Deletar"
          transition="all ease .25s"
        />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tem certeza que deseja deletar esse livro?</ModalHeader>
            <ModalBody>
              <Text>Essa ação não poderá ser revertida!</Text>
            </ModalBody>

            <ModalFooter gap="10px">
              <Button onClick={onClose}>
                Fechar
              </Button>

              <Button
                bgColor="red.500"
                _hover={{ bgColor: 'red.400' }}
                onClick={() => onDelete()}
              >
                Deletar
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
