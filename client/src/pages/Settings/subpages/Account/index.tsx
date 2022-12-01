import { Box, Button, FormControl, FormErrorMessage, FormLabel, Stack } from '@chakra-ui/react'
import { Input } from '@components/FormUtils/Input'
import Title from '@components/pages/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import { configServices } from '@services/config'
import { AuthConfigParams } from '@type/auth'
import { updateConfigSchemaValidation } from '@validations/yup/digitalLibrary/auth/update'
import { FormProvider, useForm } from 'react-hook-form'
import useAuth from 'src/hooks/useAuth'

export default function AccountSubPage() {
  const { configs, handleSetupConfig } = useAuth()
  const methods = useForm<AuthConfigParams>({
    resolver: yupResolver(updateConfigSchemaValidation),
    mode: 'onSubmit',
    defaultValues: {
      name: configs.name,
      email: configs.email,
      backupEmail: configs.backupEmail,
      password: ''
    }
  })

  async function handleOnUpdateConfig(data: AuthConfigParams) {
    const responseData = await configServices.update(data, configs)
    handleSetupConfig(responseData)
  }

  return (
    <Stack maxW="425px" mx="auto">
      <Title mb="42px">Conta</Title>

      <FormProvider {...methods}>
        <Box as="form" onSubmit={methods.handleSubmit(handleOnUpdateConfig)}>
          <Stack spacing="24px">
            <FormControl isInvalid={!!methods.formState.errors?.name}>
              <FormLabel>
                Nome
              </FormLabel>

              <Input
                size="lg"
                {...methods.register('name', { required: { value: true, message: 'Campo Obrigatório' } })}
              />

              {methods.formState.errors?.name && (
                <FormErrorMessage>
                  {methods.formState.errors?.name.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!methods.formState.errors?.email}>
              <FormLabel>
                Email
              </FormLabel>

              <Input
                size="lg"
                type="email"
                inputMode="email"
                {...methods.register('email')}
              />

              {methods.formState.errors?.email?.message && (
                <FormErrorMessage>
                  {methods.formState.errors?.email.message}
                </FormErrorMessage>
              )}
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
            type="submit"
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
