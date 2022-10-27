import {
  Box,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorMode
} from '@chakra-ui/react'
import { useMemo } from 'react'

import { LoanBookParams } from 'src/types/digitalLibrary/loanBook'

interface LoanBookCardProps {
  loan: LoanBookParams
}

export default function LoanBookCard({ loan }: LoanBookCardProps) {
  const { colorMode } = useColorMode()
  const deadline = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short'
    }
    const deliveryDate = new Date(loan.deliveryDate)
    const exitDate = new Date(loan.exitDate)

    const currentDate = new Date()
    // @ts-expect-error
    const diffInMS = deliveryDate - currentDate
    const diffInDays = Math.floor(diffInMS / (1000 * 60 * 60 * 24))
    const diffInMonth = Math.floor(diffInDays / 30.417)
    const diffInYears = Math.floor(diffInMonth / 12)

    if (diffInDays <= 0) {
      if (diffInDays === 0) {
        return 'Entrega Hoje'
      }

      const positiveDays = Math.abs(diffInDays)
      const positiveMonth = Math.abs(diffInMonth)
      const positiveYears = Math.abs(diffInYears)

      if (positiveDays >= 1 && positiveDays < 32) {
        return `${positiveDays} ${positiveDays === 1 ? 'dia atrasado' : 'dias atrasados'}`
      } else if (positiveMonth >= 1 && positiveMonth < 12) {
        return `${positiveMonth} ${positiveMonth === 1 ? 'mês atrasado' : 'meses atrasados'}`
      } else if (positiveYears >= 1) {
        return `${positiveYears} ${positiveYears === 1 ? 'ano atrasado' : 'anos atrasados'}`
      }
    }

    const displayParsed = `${exitDate.toLocaleDateString('pt-BR', options)} - ${deliveryDate.toLocaleDateString('pt-BR', options)}`
    return displayParsed
  }, [loan.deliveryDate, loan.exitDate])

  const tagColor = useMemo(() => {
    switch (loan.status) {
      case 'no_warning':
        return 'teal'
      case 'first_warning':
        return 'yellow'
      case 'second_warning':
        return 'orange'
      case 'third_warning':
        return 'red'
      default:
        return 'teal'
    }
  }, [loan.status])

  return (
    <LinkBox
      as="article"
      display="flex"
      maxWidth="250px"
      flexDirection="column"
      borderRadius="md"
      boxShadow="md"
      borderWidth="1px"
    >
      <Image
        width="100%"
        maxH="250px"
        h="250px"
        objectFit="cover"
        src={loan.book.cover}
        fallbackSrc="https://via.placeholder.com/250"
        alt={loan.book.title}
        borderTopRadius="md"
      />
      <Stack direction="column" my="3.5" mx="4">
        <Stack direction="row">
          <Tag
            p={1.5}
            borderRadius={5}
            fontSize="2xs"
            colorScheme={tagColor}
          >
            <TagLabel>{deadline}</TagLabel>
          </Tag>
        </Stack>

        <Box pt="2">
          <Heading as="h2" size="s" mb="2" color={colorMode === 'dark' ? 'white' : 'orange.500'} noOfLines={1}>
            <LinkOverlay href={`/books/${loan.id}`}>
              {loan.personName}
            </LinkOverlay>
          </Heading>

          <Text fontSize="xs" color="GrayText" noOfLines={2}>
            {loan.book.title}
          </Text>
        </Box>
      </Stack>
    </LinkBox>
  )
}
