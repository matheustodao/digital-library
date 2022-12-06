import { Flex, Heading, Image, Stack } from '@chakra-ui/react'

import readingGlasses from '@assets/images/reading-glasses.svg'

export default function NotDataSufficient() {
  return (
    <Flex justifyContent="center" pt="24">
      <Flex direction="column" gap="57px" alignItems="center">
        <Image
          src={readingGlasses}
          alt="ôculos em cima de um livro"
          w="352px"
          h="344px"
        />

        <Stack spacing="28px" alignItems="center">
          <Heading fontSize="2xl" textAlign="center">
            Não há dados suficientes para construir um gráfico
          </Heading>
        </Stack>
      </Flex>
    </Flex>
  )
}
