import { FormProvider, useForm } from 'react-hook-form'
import { FormBook } from '@components/Book/Form'
import { Box, Button, Flex, Icon, useColorModeValue } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { useNavigate } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

export default function NewBookPage() {
  const navigation = useNavigate()
  const methods = useForm()
  const currentBgColor = useColorModeValue('white', 'gray.800')

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
