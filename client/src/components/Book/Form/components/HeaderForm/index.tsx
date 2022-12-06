import { Box, Button, Flex, Icon, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import Title from '@components/pages/Title'
import { CaretLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

interface HeaderFormProps {
  label: string
}

export default function HeaderForm({ label }: HeaderFormProps) {
  const currentBgColor = useColorModeValue('white', 'gray.800')
  const [isSmallThan500] = useMediaQuery('(max-width: 500px)')
  const navigation = useNavigate()

  return (
  <Box as="header" position="sticky" top="10px" left="0" maxW="1300px" mx="auto" p="5" borderRadius="sm" bgColor={currentBgColor} zIndex="sticky" mb="12">
    <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="42px">
      <Button
        onClick={() => navigation(-1)}
        display="flex"
        type="button"
        alignItems="center" justifyContent="flex-start"
        variant="unstyled"
        gap={2}
      >
        <Icon
          as={CaretLeft}
          w="40px"
          h="40px"
          color="currentcolor"
        />
        <Title lineHeight="none" margin={0}>Novo Livro</Title>
      </Button>

      <Button
        type="submit"
        size="lg"
        bgColor="orange.500"
        color="white"
        width={isSmallThan500 ? 'full' : 'auto'}
        transition="all ease .25s"
        _hover={{ bgColor: 'orange.600' }}
        _active={{ bgColor: 'orange.500' }}
      >
        {label}
      </Button>
    </Flex>
  </Box>
  )
}
