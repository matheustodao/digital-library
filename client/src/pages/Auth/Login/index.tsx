import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import Logo from '@components/Logo'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  function handleNavigateToRegisterConfig() {
    navigate('/register')
  }

  return (
    <Stack h="85vh" py="auto" display="flex" justifyContent="center" mx="70">
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Logo variant="no-details" size="lg" />
        <Box maxW="450px" w="100%">
          <Stack spacing="24px">
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input placeholder="seu email" size="lg" />
            </FormControl>

            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input placeholder="sua senha" size="lg" py="18px" type="password" />
            </FormControl>
          </Stack>

          <Flex direction="column" gap="18px" mt="10">
            <Button type="submit" bgColor="orange.500" color="white" size="lg">
              Login
            </Button>
            <Button type="button" variant="ghost" size="lg" onClick={handleNavigateToRegisterConfig}>
              Cadastrar
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Stack>
  )
}
