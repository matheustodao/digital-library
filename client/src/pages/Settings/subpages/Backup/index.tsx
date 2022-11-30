import { Box, Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Input } from '@components/FormUtils/Input'
import Title from '@components/pages/Title'
import { CloudArrowUp } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import useAuth from 'src/hooks/useAuth'

export default function BackupSubPage() {
  const { configs } = useAuth()
  const methods = useForm({
    defaultValues: {
      emailBackup: configs.emailBackup
    }
  })

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
            >
              Realizar Backup
            </Button>
        </Flex>
      </Box>

      <FormProvider {...methods}>
        <Box as="form">
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
                {...methods.register('emailBackup')}
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
