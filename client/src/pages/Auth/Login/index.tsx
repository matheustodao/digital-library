import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import AuthLayout from '@components/Layouts/AuthLayout'
import Logo from '@components/Logo'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchemaValidation } from '@validations/yup/digitalLibrary/auth/login'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from 'src/hooks/useAuth'
import { AuthLoginParams } from '@type/digitalLibrary/auth'

export default function Login() {
  const { handleSignIn } = useAuth()
  const navigate = useNavigate()
  const { register, formState: { isValid }, handleSubmit } = useForm<AuthLoginParams>({
    resolver: yupResolver(loginSchemaValidation),
    mode: 'all'
  })

  function handleNavigateToRegisterConfig() {
    navigate('/register')
  }

  async function handleOnSubmit(data: AuthLoginParams) {
    await handleSignIn(data)
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
