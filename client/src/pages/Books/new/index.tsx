import { FormProvider, useForm } from 'react-hook-form'
import { FormBook } from '@components/Book/Form'
import { Box, Button, Flex, Icon, useColorModeValue } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

import { googleBookServices } from '@services/googleBooks'
import { toast } from 'react-toastify'
import { NewBookParams } from '@type/digitalLibrary/book'
import { booksServices } from '@services/books'
import { yupResolver } from '@hookform/resolvers/yup'
import { createBookSchemaValidation } from '@validations/yup/digitalLibrary/book/create'

export default function NewBookPage() {
  const currentBgColor = useColorModeValue('white', 'gray.800')
  const navigation = useNavigate()
  const methods = useForm<NewBookParams>({
    resolver: yupResolver(createBookSchemaValidation),
    mode: 'onBlur'
  })

  async function handleFindBookInformation() {
    const isbn: any = methods.watch('isbn')?.trim() ?? ''
    if (!isbn) return

    const toastId = toast.loading('Procurando livro pelo ISBN...')
    const data = await googleBookServices.index({ q: isbn }) as { totalItems: number, items: any[] }

    if (data.totalItems === 0) {
      methods.reset({
        title: '',
        authors: '',
        description: '',
        cover: '',
        categories: '',
        publishingCompany: ''
      })

      toast.update(toastId, {
        render: 'Não foi possível encontrar livro 😔',
        isLoading: false,
        type: 'info',
        autoClose: 860
      })
      return
    }

    const book = data.items.find((currentItem) => (
      currentItem.volumeInfo?.publisher || currentItem.volumeInfo?.categories || currentItem.volumeInfo?.imageLinks
    )).volumeInfo

    toast.update(toastId, {
      render: 'Livro Encontrado 😃',
      isLoading: false,
      autoClose: 860,
      type: 'success'
    })

    const parsedBook = {
      title: !book?.subtitle ? book.title : `${book.title} - ${book.subtitle}`,
      authors: book?.authors?.join(', ') ?? '',
      description: book?.description ?? '',
      cover: book?.imageLinks.thumbnail ?? '',
      categories: book?.categories?.join(', ') ?? '',
      publishingCompany: book?.publisher ?? ''

    }

    methods.reset(parsedBook)
  }

  async function handleOnSubmit(data: NewBookParams) {
    const registeredBook = await booksServices.create(data)
    navigation(`/books/${registeredBook.id}`, { replace: true })
  }

  return (
    <FormProvider {...methods}>
      <Box as="form" position="relative" onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <Box as="header" position="sticky" top="10px" left="0" maxW="1300px" mx="auto" p="5" borderRadius="sm" bgColor={currentBgColor} zIndex="sticky">
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              onClick={() => navigation(-1)}
              display="flex"
              type="button"
              alignItems="center" justifyContent="flex-start"
              variant="unstyled"
              gap={2}
            >
              <Icon
                as={CaretLeft}
                w="40px"
                h="40px"
                color="currentcolor"
              />
              <Title lineHeight="none" margin={0}>Novo Livro</Title>
            </Button>

            <Button
              type="submit"
              size="lg"
              bgColor="orange.500"
              color="white"
              transition="all ease .25s"
              _hover={{ bgColor: 'orange.600' }}
              _active={{ bgColor: 'orange.500' }}
            >
              Cadastrar
            </Button>
          </Flex>
        </Box>

        {/* Form Book Component */}
        <FormBook
          fields={{
            _isbn: {
              description: (
              <Button variant="link" size="sm" fontSize="0.875rem" fontWeight="thin" color="GrayText" mb="-10px" onClick={handleFindBookInformation}>
                Buscar informações do livro pelo ISBN
              </Button>
              )
            }
          }}
        />
      </Box>
    </FormProvider>
  )
}
