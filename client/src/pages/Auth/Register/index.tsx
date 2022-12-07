import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

import { Input } from '@components/FormUtils/Input'
import RequiredAsterisk from '@components/FormUtils/RequiredAsterisk'
import AuthLayout from '@components/Layouts/AuthLayout'
import Logo from '@components/Logo'
import { yupResolver } from '@hookform/resolvers/yup'
import { configServices } from '@services/config'
import { AuthConfigParams } from '@type/auth'
import { registerSchemaValidation } from '@validations/yup/digitalLibrary/auth/register'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from 'src/hooks/useAuth'

export default function Register() {
  const { handleSignIn } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const { register, formState: { isValid, errors }, handleSubmit, watch } = useForm<AuthConfigParams>({
    resolver: yupResolver(registerSchemaValidation),
    mode: 'all'
  })

  async function handleOnSubmit(data: AuthConfigParams) {
    try {
      await configServices.register(data)

      await handleSignIn({
        email: data.email,
        password: data.password
      })
    } catch (err) {
      const error = err as AxiosError<{ error: string }>
      if (error?.response?.data?.error?.toLowerCase() === 'Ja existe um usuário cadastrado nessa máquina'.toLowerCase()) {
        onOpen()
      }
    }
  }

  async function handleConfirmForceRegister() {
    const data = watch()
    await handleOnSubmit({ ...data, force: true })
  }

  function handleNavigateToLoginPage() {
    navigate('/login')
  }

  return (
    <AuthLayout>
      <Logo variant="no-details" size="lg" />
      <Box maxW="450px" w="100%" as="form" noValidate onSubmit={handleSubmit(handleOnSubmit)}>
        <Stack spacing="24px">
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel>
              Nome da instituição
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="instituição" size="lg" {...register('name')} />
            {!!errors?.name && (
              <FormErrorMessage>
                {errors.name.message as string}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors?.email}>
            <FormLabel>
              E-mail
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="seu email" type="email" size="lg" {...register('email')} />
            {!!errors?.email && (
              <FormErrorMessage>
                {errors.email.message as string}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>E-mail de backup</FormLabel>
            <Input placeholder="seu email" size="lg" type="email" {...register('backupEmail')} />
          </FormControl>

          <FormControl isInvalid={!!errors?.password}>
            <FormLabel>
              Senha
              <RequiredAsterisk />
            </FormLabel>
            <Input placeholder="sua senha" size="lg" py="18px" type="password" {...register('password')} />
            {!!errors?.password && (
              <FormErrorMessage>
                {errors.password.message as string}
              </FormErrorMessage>
            )}
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
            Cadastrar
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={handleNavigateToLoginPage}>
            Login
          </Button>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ops! Já tem uma conta cadastrada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Infelizmente não é possível recuperar a senha, no entanto, se preferir você pode apagar
              {' '}
              a conta cadastrada no sistema.
              {' '}
              E caso tenha arquivos da planilha de livros ou empréstimos você poderá importar os dados cadastrados.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant='ghost' onClick={handleConfirmForceRegister}>Apagar Tudo e Cadastrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AuthLayout>
  )
}
