import { Flex, Heading, Image, Stack } from '@chakra-ui/react'

import bookLoverBoyImage from '@assets/images/book-lover-boy.svg'

export default function NotFoundData() {
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
            Não há dados correspondente
          </Heading>
        </Stack>
      </Flex>
    </Flex>
  )
}
