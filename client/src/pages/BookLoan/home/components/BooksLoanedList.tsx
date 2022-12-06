import { Flex, FlexProps } from '@chakra-ui/react'
import BookLoanCard from '@components/BookLoan/Card'
import { BookLoanParams } from '@type/bookLoan'

interface BooksLoanedListProps {
  loans: BookLoanParams[]
  _flexProps?: FlexProps
}

export default function BooksLoanedList({ loans, _flexProps }: BooksLoanedListProps) {
  return (
    <Flex flexWrap="wrap" gap="32px 24px" {..._flexProps}>
      {loans.map((loan) => (
        <BookLoanCard loan={loan} key={loan.id} />
      ))}
    </Flex>
  )
}
