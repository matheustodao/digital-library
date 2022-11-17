import {
  Stack,
  Flex,
  Image,
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalContent,
  ModalFooter,
  useMediaQuery
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { FieldInputGroup } from './components/FieldInputGroup'

interface FormBookProps {
  fields?: {
    _isbn?: {
      description: ReactNode
    }
  }
}

export function FormBook({ fields }: FormBookProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSmallThan800] = useMediaQuery('(max-width: 800px)')
  const { watch, register } = useFormContext()
  const coverURL = watch('cover')

  return (
    <Stack spacing="42px" mb="12" maxW="1115px" w="100%" mx="auto">
      <FieldInputGroup
        label="Titulo do livro"
        name="title"
        required
      />

      <Flex alignItems="center" gap="24px" direction={isSmallThan800 ? 'column' : 'row'}>
        <FieldInputGroup
          label="ISBN"
          name="isbn"
          description={fields?._isbn?.description}
        />

        <FieldInputGroup
          label="Tombo"
          name="tumble"
          description={
            <Button variant="link" size="sm" fontSize="0.875rem" fontWeight="thin" color="GrayText" mb="-10px" onClick={onOpen}>
              Gerar Tombo
            </Button>
          }
          required
        />
      </Flex>

      <Flex alignItems="center" gap="24px" direction={isSmallThan800 ? 'column' : 'row'}>
        <FieldInputGroup
          label="Autor"
          name="authors"
          required
          description="Se houver mais de um autor separe por virgula"
        />

        <FieldInputGroup
          label="Categorias"
          name="categories"
          required
          description="Se houver mais de uma categoria separe por virgula"
        />
      </Flex>

      <Flex alignItems="center" gap="24px" direction={isSmallThan800 ? 'column' : 'row'}>
        <FieldInputGroup
          label="Editora"
          name="publishingCompany"
          required
        />

        <FieldInputGroup
          label="Exemplares"
          name="quantity"
          required
          _inputProps={{
            type: 'number',
            min: 1,
            inputMode: 'numeric'
          }}
        />
      </Flex>

      <Flex alignItems="flex-start" gap="24px" direction={isSmallThan800 ? 'column' : 'row'}>
        <Box w="100%">
          <FieldInputGroup
            label="URL da Capa"
            name="cover"
          />

          <Image
            mx="auto"
            objectFit="cover"
            src={coverURL}
            fallbackSrc="https://via.placeholder.com/525"
            maxH="525px"
            h="525px"
            w="345px"
            alt={coverURL ? 'Capa do livro' : 'Sem capa'}
            borderTopRadius="md"
            mt="5"
          />
        </Box>

        <FormControl h="623px">
          <FormLabel>Descrição</FormLabel>
          <Textarea h="100%" resize="none" focusBorderColor="orange.500" {...register('description')} />
        </FormControl>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        blockScrollOnMount
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="white" color="blackAlpha.800">
          <ModalHeader>Gerar Tombo</ModalHeader>
            <ModalBody>
              <iframe
                src="https://www.tabelacutter.com/"
                width="100%"
                height="610px"
                style={{
                  overflowX: 'hidden'
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} bgColor="GrayText" color="white" _hover={{ bgColor: 'none' }} _active={{ bgColor: 'none' }}>
                Fechar
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

FormBook.defaultProps = {
  fields: null
}
