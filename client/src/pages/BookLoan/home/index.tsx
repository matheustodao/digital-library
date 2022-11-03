import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import BookLoanCard from '@components/BookLoan/Card'

import loansBooks from '@mocks/loansBooks.json'
import HeaderPage from '@components/pages/HeaderPage'
import { Plus } from 'phosphor-react'
import Title from '@components/pages/Title'

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
      <SimpleGrid minChildWidth={249} spacingX="24px" spacingY="32px">
        {loansBooks.results.map((loan) => (
          <BookLoanCard loan={loan} key={loan.id} />
        ))}
      </SimpleGrid>
    </>
  )
}
