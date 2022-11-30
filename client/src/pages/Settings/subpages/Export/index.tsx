import { Box, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { formatOptions, importToOptions } from '@pages/Settings/utils/select-options'
import { Select } from 'chakra-react-select'

export default function ExportSubPage() {
  return (
    <Stack maxW="453px" mx="auto">
      <Title mb="42px">Exportação</Title>

      <Box display="flex" flexDir="column" gap="32px">
        <FormControl>
          <FormLabel>O que deseja exportar</FormLabel>
          <Select
            options={importToOptions}
            placeholder="Escolha uma opção"
            focusBorderColor="orange.500"
            errorBorderColor="red"
          />
        </FormControl>

      <FormControl>
          <FormLabel>Gerar no formato</FormLabel>
          <Select
            options={formatOptions}
            placeholder="Escolha uma opção"
            focusBorderColor="orange.500"
            errorBorderColor="red"
          />
        </FormControl>

        <Box>
          <Button
            mt="10px"
            color="white"
            bg="orange.500"
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
