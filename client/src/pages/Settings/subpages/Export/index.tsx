import { Box, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { formatOptions, importToOptions } from '@pages/Settings/utils/select-options'
import { exportDataServices } from '@services/export'
import { Select } from 'chakra-react-select'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { exportSchemaValidation } from '@validations/yup/digitalLibrary/export'
import downloadFile from 'js-file-download'

export default function ExportSubPage() {
  // const { download } = useDownloader()
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(exportSchemaValidation),
    mode: 'onBlur'
  })

  async function onExportData(data: any) {
    const fileExtension = data.format === 'pdf' ? 'pdf' : 'xlsx'
    let file: any = null
    const date = new Date()
    const currentDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })
    const content = data.content === 'books' ? 'livros' : 'emprestimos'
    const filename = `${content}-${currentDate}-${date.toISOString()}.${fileExtension}`

    if (fileExtension === 'pdf') {
      file = await exportDataServices.exportPDF(data)
      downloadFile(file, filename, 'application/x-pdf')
      return
    }

    file = await exportDataServices.exportXLSX(data)

    downloadFile(file, filename)
  }

  return (
    <Stack maxW="453px" mx="auto">
      <Title mb="42px">Exportação</Title>

      <Box as="form" display="flex" flexDir="column" gap="32px" onSubmit={handleSubmit(onExportData)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel>O que deseja exportar</FormLabel>
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
          name="format"
          render={({ field }) => (
            <FormControl>
              <FormLabel>Gerar no formato</FormLabel>
              <Select
                options={formatOptions}
                placeholder="Escolha uma opção"
                focusBorderColor="orange.500"
                errorBorderColor="red"
                {...field}
              />
            </FormControl>
          )}
        />

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
            Exportar
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
