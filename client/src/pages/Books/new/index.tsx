import { FormProvider, useForm } from 'react-hook-form'
import { FormBook } from '@components/Book/Form'
import { Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { googleBookServices } from '@services/googleBooks'
import { toast } from 'react-toastify'
import { NewBookParams } from '@type/book'
import { booksServices } from '@services/books'
import { yupResolver } from '@hookform/resolvers/yup'
import { createBookSchemaValidation } from '@validations/yup/digitalLibrary/book/create'
import HeaderForm from '@components/Book/Form/components/HeaderForm'

export default function NewBookPage() {
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
        <HeaderForm label="Cadastrar" />

        {/* Form Book Component */}
        <FormBook
          fields={{
            _isbn: {
              description: (
              <Button
                variant="link"
                size="sm"
                textDecor="underline"
                fontSize="0.875rem"
                fontWeight="thin"
                color="blue.600"
                mb="-10px" onClick={handleFindBookInformation}
              >
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
