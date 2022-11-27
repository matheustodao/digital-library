import Title from '@components/pages/Title'
import { useEffect, useState } from 'react'
import { reportsServices } from '@services/reports'
import { GraphLineType } from '@type/lib/nivo'
import ResponsiveLineCustom from '@components/Charts/Responsive/Line'
import { Box } from '@chakra-ui/react'

export default function HomePage() {
  const [byMonthLoans, setByMonthLoans] = useState([] as GraphLineType[])

  async function loadByMonthLoans() {
    const data = await reportsServices.byMonthLoans()
    setByMonthLoans(data)
  }

  useEffect(() => {
    loadByMonthLoans()
  }, [])

  return (
    <>
      <Title fontWeight="black" color="orange.500" opacity={0.9}>Dashboard</Title>

      <Box>
        <Title as="h2" fontWeight="bold">Empréstimos mensal de {new Date().getFullYear()}</Title>
        <ResponsiveLineCustom data={byMonthLoans} />
      </Box>
    </>
  )
}
