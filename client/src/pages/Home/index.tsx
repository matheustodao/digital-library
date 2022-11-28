import { useCallback, useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Title from '@components/pages/Title'
import ResponsiveLineCustom from '@components/Charts/Responsive/Line'
import ResponsivePieCustom from '@components/Charts/Responsive/Pie'
import NotDataSufficient from '@components/Errors/NotDataSufficient'

import { GeneralDataResponseType, reportsServices } from '@services/reports'
import { GraphLineType, GraphPieType } from '@type/lib/nivo'

export default function HomePage() {
  const [byMonthLoans, setByMonthLoans] = useState<GraphLineType[] | null>(null)
  const [topBooksCategories, setTopBooksCategories] = useState<GraphPieType[] | null>(null)
  const [comparation, setComparation] = useState<GeneralDataResponseType | null>(null)

  async function loadByMonthLoans() {
    const data = await reportsServices.byMonthLoans()
    setByMonthLoans(data)
  }

  async function loadTopBooksCategories() {
    const data = await reportsServices.getTopBooksCategories()
    setTopBooksCategories(data)
  }

  const loadGeneralData = useCallback(async () => {
    const data = await reportsServices.getGeneralData()
    setComparation(data as any)
  }, [])

  useEffect(() => {
    loadByMonthLoans()
    loadTopBooksCategories()
    loadGeneralData()
  }, [loadGeneralData])

  return (
    <>
      <Title fontWeight="black" color="orange.500" opacity={0.9}>Dashboard</Title>

      {
        (!topBooksCategories && !comparation?.studentsComparedToEmployee && !comparation?.booksComparedToLoans && !byMonthLoans) &&
        (
          <NotDataSufficient />
        )
      }

      {byMonthLoans && (
        <Box>
          <Title as="h2" fontWeight="bold">Empréstimos mensal de {new Date().getFullYear()}</Title>
          <ResponsiveLineCustom data={byMonthLoans} />
        </Box>
      )}

      {(topBooksCategories ?? comparation?.studentsComparedToEmployee ?? comparation?.booksComparedToLoans) && (
        <Flex alignItems="center" justifyContent="space-around" gap="32px" py="52px" flexWrap="wrap">
          {topBooksCategories && (
            <Box>
              <Title as="h2" fontWeight="bold">
                Top
                {' '}
                {topBooksCategories.length === 6 ? '5' : topBooksCategories.length}
                {' '} Categorias de livros
              </Title>
              <ResponsivePieCustom data={topBooksCategories} />
            </Box>
          )}

          {comparation?.studentsComparedToEmployee && (
            <Box>
              <Title as="h2" fontWeight="bold">Alunos vs Funcionários</Title>
              <ResponsivePieCustom data={comparation?.studentsComparedToEmployee} />
            </Box>
          )}

          {comparation?.booksComparedToLoans && (
            <Box>
              <Title as="h2" fontWeight="bold">Livros vs Alugado</Title>
              <ResponsivePieCustom data={comparation?.booksComparedToLoans} />
            </Box>
          )}
        </Flex>
      )}

    </>
  )
}
