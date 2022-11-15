import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'
import AuthLayout from '@components/Layouts/AuthLayout'
import Logo from '@components/Logo'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  function handleNavigateToLoginPage() {
    navigate('/login')
  }

  return (
    <AuthLayout>
      <Logo variant="no-details" size="lg" />
      <Box maxW="450px" w="100%">
        <Stack spacing="24px">
          <FormControl>
            <FormLabel>
              Nome da instituição
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="seu email" size="lg" />
          </FormControl>

          <FormControl>
            <FormLabel>
              E-mail
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="seu email" size="lg" />
          </FormControl>

          <FormControl>
            <FormLabel>E-mail de backup</FormLabel>
            <Input placeholder="seu email" size="lg" />
          </FormControl>

          <FormControl>
            <FormLabel>
              Senha
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="sua senha" size="lg" py="18px" type="password" />
          </FormControl>
        </Stack>

        <Flex direction="column" gap="18px" mt="10">
          <Button type="submit" bgColor="orange.500" color="white" size="lg">
            Cadastrar
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={handleNavigateToLoginPage}>
            Login
          </Button>
        </Flex>
      </Box>
    </AuthLayout>
  )
}
