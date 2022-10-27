import { Box, Flex } from '@chakra-ui/react'
import LoanBookCard from 'src/components/LoanBook/Card'

import loansBooks from '@mocks/loansBooks.json'
import HeaderPage from 'src/components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from 'src/components/pages/Title'

export default function LoansBooksPage() {
  return (
    <>
      <Title>Livros Alugados</Title>

      <Box pb="8">
        <HeaderPage
          button={{
            label: (
              <Flex align="center" gap="2">
                <Plus weight="bold" />
                Novo Empréstimo
              </Flex>
            )
          }}
          search={{
            placeholder: 'Pesquise por nome da pessoa ou autor, titulo do livro...'
          }}
        />
      </Box>
      {loansBooks.results.map((loan) => (
        <LoanBookCard loan={loan} key={loan.id} />
      ))}
    </>
  )
}
