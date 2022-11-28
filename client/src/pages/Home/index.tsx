import Title from '@components/pages/Title'
import { useEffect, useState } from 'react'
import { reportsServices } from '@services/reports'
import { GraphLineType, GraphPieType } from '@type/lib/nivo'
import ResponsiveLineCustom from '@components/Charts/Responsive/Line'
import { Box } from '@chakra-ui/react'

import ResponsivePieCustom from '@components/Charts/Responsive/Pie'

export default function HomePage() {
  const [byMonthLoans, setByMonthLoans] = useState([] as GraphLineType[])
  const [topBooksCategories, setTopBooksCategories] = useState([] as GraphPieType[])

  async function loadByMonthLoans() {
    const data = await reportsServices.byMonthLoans()
    setByMonthLoans(data)
  }

  async function loadTopBooksCategories() {
    const data = await reportsServices.getTopBooksCategories()
    setTopBooksCategories(data)
  }

  useEffect(() => {
    loadByMonthLoans()
    loadTopBooksCategories()
  }, [])

  return (
    <>
      <Title fontWeight="black" color="orange.500" opacity={0.9}>Dashboard</Title>

      <Box>
        <Title as="h2" fontWeight="bold">Empréstimos mensal de {new Date().getFullYear()}</Title>
        <ResponsiveLineCustom data={byMonthLoans} />
      </Box>

      <Box pt="20">
        <Title as="h2" fontWeight="bold">
          Top
          {' '}
          {topBooksCategories.length === 6 ? '5' : topBooksCategories.length}
          {' '} Categorias de livros
        </Title>
        <ResponsivePieCustom data={topBooksCategories} />
      </Box>
    </>
  )
}
