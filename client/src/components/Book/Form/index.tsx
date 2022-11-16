import { Stack, Flex, Image, Box, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { FieldInputGroup } from './components/FieldInputGroup'

export function FormBook() {
  const { watch } = useFormContext()
  const coverURL = watch('cover')

  return (
    <Stack spacing="42px" mb="12" maxW="1115px" w="100%" mx="auto">
      <FieldInputGroup
        label="Titulo do livro"
        name="title"
        required
      />

      <Flex alignItems="center" gap="24px">
        <FieldInputGroup
          label="ISBN"
          name="isbn"
          description="Digite isbn para buscar os dados do livro"
        />

        <FieldInputGroup
          label="Tombo"
          name="tumble"
          description={
            <Button variant="link" size="sm" fontSize="0.875rem" fontWeight="thin" color="GrayText" mb="-10px">
              Gerar Tombo
            </Button>
          }
          required
        />
      </Flex>

      <Flex alignItems="center" gap="24px">
        <FieldInputGroup
          label="Autor"
          name="authors"
          required
          description="Se houver mais de um autor separe por virgula"
        />

        <FieldInputGroup
          label="Categorias"
          name="categories"
          required
          description="Se houver mais de uma categoria separe por virgula"
        />
      </Flex>

      <Flex alignItems="center" gap="24px">
        <FieldInputGroup
          label="Editora"
          name="publishingCompany"
          required
        />

        <FieldInputGroup
          label="Exemplares"
          name="quantity"
          required
        />
      </Flex>

      <Flex alignItems="center" gap="24px">
        <Box w="100%">
          <FieldInputGroup
            label="URL da Capa"
            name="cover"
          />

          <Image
            mx="auto"
            objectFit="cover"
            src={coverURL}
            fallbackSrc="https://via.placeholder.com/525"
            maxH="525px"
            h="525px"
            w="345px"
            alt={coverURL ? 'Capa do livro' : 'Sem capa'}
            borderTopRadius="md"
            mt="5"
          />
        </Box>

        <FormControl h="623px">
          <FormLabel>Descrição</FormLabel>
          <Textarea h="100%" resize="none" focusBorderColor="orange.500" />
        </FormControl>
      </Flex>

    </Stack>
  )
}
