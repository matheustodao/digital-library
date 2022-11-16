import { FormProvider, useForm } from 'react-hook-form'
import { FormBook } from '@components/Book/Form'
import { Box, Button, Flex, Icon, useColorModeValue } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'
import { useCallback, useEffect, useRef } from 'react'
import { googleBookServices } from '@services/digitalLibrary/googleBooks'

export default function NewBookPage() {
  const navigation = useNavigate()
  const methods = useForm()
  const currentBgColor = useColorModeValue('white', 'gray.800')
  const fetchedBookInformation = useRef({})
  const isbn = methods.watch('isbn')

  const findBookInformation = useCallback(async () => {
    if (!isbn?.trim()) return
    const data = await googleBookServices.index({ q: isbn.trim() }) as { totalItems: number, items: any[] }
    if (data.totalItems === 0) {
      fetchedBookInformation.current = { }
      return
    }

    setTimeout(() => {
      const book = data.items.find((currentItem) => currentItem.volumeInfo?.publisher).volumeInfo

      const parsedBook = {
        title: !book?.subtitle ? book.title : `${book.title} - ${book.subtitle}`,
        authors: book?.authors.join(', '),
        description: book?.description,
        cover: book?.imageLinks.thumbnail,
        categories: book?.categories.join(', '),
        publishingCompany: book.publisher

      }

      fetchedBookInformation.current = { ...fetchedBookInformation.current, ...parsedBook }
      methods.reset(parsedBook)
    }, 500)
  }, [isbn])

  useEffect(() => {
    findBookInformation()
  }, [findBookInformation])

  return (
    <FormProvider {...methods}>
      <Box as="form" position="relative">
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
        <FormBook />
      </Box>
    </FormProvider>
  )
}
