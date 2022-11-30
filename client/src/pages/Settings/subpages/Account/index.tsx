import { Box, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Input } from '@components/FormUtils/Input'
import Title from '@components/pages/Title'
import { FormProvider, useForm } from 'react-hook-form'
import useAuth from 'src/hooks/useAuth'

export default function AccountSubPage() {
  const { configs } = useAuth()
  const methods = useForm({
    defaultValues: {
      name: configs.name,
      email: configs.email,
      password: ''
    }
  })

  return (
    <Stack maxW="425px" mx="auto">
      <Title mb="42px">Conta</Title>

      <FormProvider {...methods}>
        <Box as="form">
          <Stack spacing="24px">
            <FormControl>
              <FormLabel>
                Nome
              </FormLabel>

              <Input
                size="lg"
                {...methods.register('name')}
              />
            </FormControl>

            <FormControl>
              <FormLabel>
                Email
              </FormLabel>

              <Input
                size="lg"
                type="email"
                inputMode="email"
                {...methods.register('email')}
              />
            </FormControl>

            <FormControl>
              <FormLabel>
                Nova Senha
              </FormLabel>

              <Input
                size="lg"
                type="password"
                {...methods.register('password')}
              />
            </FormControl>
          </Stack>

          <Button
            mt="32px"
            color="white"
            bg="orange.500"
            transition="all ease .25s"
            _hover={{ bgColor: 'orange.600' }}
            _active={{ bgColor: 'orange.500' }}
          >
            Atualizar
          </Button>
        </Box>
      </FormProvider>
    </Stack>
  )
}
