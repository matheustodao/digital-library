import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import AuthLayout from '@components/Layouts/AuthLayout'
import Logo from '@components/Logo'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchemaValidation } from '@validations/yup/digitalLibrary/auth/login'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { invalidCredentials } from 'src/core/infra/errors/digitalLibrary/status/400/invalidCredentials'
import { configServices } from 'src/core/services/digitalLibrary/config'

export default function Login() {
  const navigate = useNavigate()
  const { register, formState: { isValid }, handleSubmit } = useForm({
    resolver: yupResolver(loginSchemaValidation),
    mode: 'all'
  })

  function handleNavigateToRegisterConfig() {
    navigate('/register')
  }

  async function handleOnSubmit(data: any) {
    try {
      await configServices.login(data)
      toast.success('Oba!')
    } catch (err: any) {
      if (err instanceof Error) {
        invalidCredentials(err)
      }
    }
  }

  return (
    <AuthLayout>
      <Logo variant="no-details" size="lg" />
      <Box maxW="450px" w="100%" as="form" noValidate onSubmit={handleSubmit(handleOnSubmit)}>
        <Stack spacing="24px">
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input placeholder="seu email" size="lg" {...register('email')} />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input placeholder="sua senha" size="lg" py="18px" type="password" {...register('password')} />
          </FormControl>
        </Stack>

        <Flex direction="column" gap="18px" mt="10">
          <Button
            type="submit"
            bgColor="orange.500"
            color="white"
            size="lg"
            disabled={!isValid}
            _hover={{ bgColor: !isValid ? 'orange.500' : 'orange.600' }}
            _active={{ bgColor: !isValid ? 'orange.500' : 'orange.500' }}
          >
            Login
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={handleNavigateToRegisterConfig}>
            Cadastrar
          </Button>
        </Flex>
      </Box>
    </AuthLayout>
  )
}
