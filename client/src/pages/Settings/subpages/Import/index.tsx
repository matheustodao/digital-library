import { Box, Button, Flex, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { importToOptions } from '@pages/Settings/utils/select-options'
import { Select } from 'chakra-react-select'

export default function ImportSubPage() {
  return (
    <Stack maxW="453px" mx="auto">
      <Title mb="42px">Importação</Title>

      <Box display="flex" flexDir="column" gap="32px">
        <FormControl>
          <FormLabel>Gostaria de importar para:</FormLabel>
          <Select
            options={importToOptions}
            placeholder="Escolha uma opção"
            focusBorderColor="orange.500"
            errorBorderColor="red"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Ao importar os dados:</FormLabel>
          <RadioGroup name="triggerData" defaultValue="maintain">
            <Flex gap="24px" flexWrap="wrap">
              <Radio value="maintain" defaultChecked>Deseja somente adicionar e manter os já cadastrados</Radio>

              <Radio value="replace">Deseja substituir os dados existentes</Radio>
            </Flex>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Arquivo</FormLabel>
          <Stack border="1px dashed" borderColor="ActiveBorder" borderRadius="md">
            <Flex alignItems="center" justifyContent="center" flexDir="column" py="10">
              <Text>Arraste e solta o arquivo</Text>
                <Text as="span">ou</Text>
                <br />
                <Box as="label" p="6px 32px" bg="orange.700" borderRadius="md" fontWeight="bold" color="white" cursor="pointer">
                  Clica Aqui
                  <Input type="file" display="none" />
                </Box>
            </Flex>
          </Stack>
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
            Importar
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
