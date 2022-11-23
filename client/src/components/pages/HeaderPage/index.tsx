import { Box, Button, ButtonProps, Flex, InputProps, useMediaQuery } from '@chakra-ui/react'
import { ReactNode } from 'react'
import SearchBar from '@components/SearchBar'

interface IProps {
  button: ButtonProps & {
    label: ReactNode
  }

  search?: InputProps
}

export default function HeaderPage({ button, search }: IProps) {
  const [isSmallThan586] = useMediaQuery('(max-width: 586px)')
  const { label, ...restButtonProps } = button

  return (
    <Flex
      alignItems={isSmallThan586 ? 'flex-start' : 'center'}
      justifyContent={isSmallThan586 ? 'none' : 'space-between'}
      rowGap={isSmallThan586 ? '24px' : 'none'}
      direction={isSmallThan586 ? 'column' : 'row'}
    >
      <Box
        maxW="548px"
        width="100%"
        flex={isSmallThan586 ? '1' : '0.9'}
      >
        <SearchBar {...search} />
      </Box>

      <Button
        bgColor="orange.500"
        color="white"
        fontWeight="semibold"
        size="lg"
        _hover={{ bg: 'orange.600' }}
        {...restButtonProps}
      >
        {label}
      </Button>
    </Flex>
  )
}
