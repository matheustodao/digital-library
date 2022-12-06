import { Button, Flex, Heading, Image, Stack } from '@chakra-ui/react'

import bookLoverBoyImage from '@assets/images/book-lover-boy.svg'
import { useNavigate } from 'react-router-dom'

export default function NotBookLoanedFound() {
  const navigate = useNavigate()

  function handleNavigateToCreateBook() {
    navigate('/loans/new')
  }

  return (
    <Flex justifyContent="center" pt="24">
      <Flex direction="column" gap="57px" alignItems="center">
        <Image
          src={bookLoverBoyImage}
          alt="Garoto deitado no chão lendo um livro"
          w="352px"
          h="344px"
        />

        <Stack spacing="28px" alignItems="center">
          <Heading fontSize="2xl" textAlign="center">
            Não há livros emprestados
          </Heading>

          <Button
            maxWidth="252px"
            bgColor="orange.500"
            color="white"
            fontWeight="semibold"
            size="md"
            _hover={{ bg: 'orange.600' }}
            onClick={handleNavigateToCreateBook}
          >
            Cadastrar Agora
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}
