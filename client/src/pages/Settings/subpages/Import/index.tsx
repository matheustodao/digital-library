import { Box, Button, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import { importToOptions } from '@pages/Settings/utils/select-options'
import { importDataServices } from '@services/import'
import { importSchemaValidation } from '@validations/yup/digitalLibrary/import'
import { Select } from 'chakra-react-select'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function ImportSubPage() {
  const navigation = useNavigate()
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(importSchemaValidation)
  })

  async function onImportFile(data: any) {
    if (data.type === 'books') {
      await importDataServices.books(data)
    }

    if (data.type === 'loans') {
      await importDataServices.loans(data)
    }

    navigation('/home')
  }

  return (
    <Stack maxW="453px" mx="auto">
      <Title mb="42px">Importação</Title>

      <Box display="flex" flexDir="column" gap="32px" as="form" onSubmit={handleSubmit(onImportFile)}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <FormControl>
              <FormLabel>Gostaria de importar para:</FormLabel>
              <Select
                options={importToOptions}
                placeholder="Escolha uma opção"
                focusBorderColor="orange.500"
                errorBorderColor="red"
                {...field}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="keepData"
          defaultValue="maintain"
          render={({ field }) => (
            <FormControl>
              <FormLabel>Ao importar os dados:</FormLabel>
              <RadioGroup {...field}>
                <Flex gap="24px" flexWrap="wrap">
                  <Radio value="maintain" defaultChecked>
                    Deseja somente adicionar e manter os já cadastrados
                  </Radio>

                  <Radio value="replace">
                    Deseja substituir os dados existentes
                  </Radio>
                </Flex>
              </RadioGroup>
            </FormControl>
          )}
        />

        <FormControl>
          <FormLabel>Arquivo</FormLabel>
          <Stack border="1px dashed" borderColor="ActiveBorder" borderRadius="md">
            <Flex alignItems="center" justifyContent="center" flexDir="column" py="10">
              <Text>Arraste e solta o arquivo</Text>
                <Text as="span">ou</Text>
                <br />
                <Box as="label" p="6px 32px" bg="orange.700" borderRadius="md" fontWeight="bold" color="white" cursor="pointer">
                  Clica Aqui
                  <Input type="file" display="none" {...register('file')} accept=".xlsx, .csv" />
                </Box>
            </Flex>
          </Stack>
        </FormControl>

        <Box>
          <Button
            mt="10px"
            color="white"
            bg="orange.500"
            type="submit"
            transition="all ease .25s"
            _hover={{ bgColor: 'orange.600' }}
            _active={{ bgColor: 'orange.500' }}
          >
            Importar
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
