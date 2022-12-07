import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Input } from '@components/FormUtils/Input'
import Title from '@components/pages/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import { configServices } from '@services/config'
import { backupDataServices } from '@services/backup'
import { AuthConfigParams } from '@type/auth'
import { updateConfigSchemaValidation } from '@validations/yup/digitalLibrary/auth/update'
import { CloudArrowUp } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import useAuth from 'src/hooks/useAuth'
import downloadFile from 'js-file-download'

export default function BackupSubPage() {
  const { configs, handleSetupConfig } = useAuth()
  const methods = useForm<AuthConfigParams>({
    resolver: yupResolver(updateConfigSchemaValidation),
    mode: 'onSubmit',
    defaultValues: {
      backupEmail: configs.backupEmail,
      name: configs.name,
      email: configs.email,
      password: ''
    }
  })

  async function handleOnUpdateConfigEmailBackup(data: AuthConfigParams) {
    const responseData = await configServices.update(data, configs)
    handleSetupConfig(responseData)
  }

  async function handleMakeBackup() {
    const file = await backupDataServices.backup()
    const date = new Date()
    const currentDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })
    const filename = `backup-${currentDate}-${date.toISOString()}.zip`
    downloadFile(file, filename)
  }

  return (
    <Stack maxW="425px" mx="auto">
      <Title mb="42px" >Backup</Title>

      <Box pb="22px">
        <Flex alignItems="center" justifyContent="space-between" gap="24px">
          <CloudArrowUp size={32} color="#38A169" />
          <Button
            size="sm"
            bgColor="orange.600"
            transition="all ease .25s"
            color="white"
            _hover={{ bgColor: 'orange.600' }}
            _active={{ bgColor: 'orange.500' }}
            type="button"
            onClick={handleMakeBackup}
            >
              Realizar Backup
            </Button>
        </Flex>
      </Box>

      <FormProvider {...methods}>
        <Box as="form" onSubmit={methods.handleSubmit(handleOnUpdateConfigEmailBackup)}>
          <Title as="h2" mb="32px">Atualizar</Title>
          <Stack spacing="24px">
            <FormControl>
              <FormLabel>
                Email
              </FormLabel>

              <Input
                size="lg"
                type="email"
                inputMode="email"
                {...methods.register('backupEmail')}
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
