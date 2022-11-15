import { Stack, Flex, useMediaQuery } from '@chakra-ui/react'
import { ColorModeSwitcher } from '@components/ColorModeSwitcher'

export default function AuthLayout({ children }: any) {
  const [isSmallThan1100, isSmallThan1500] = useMediaQuery(['(max-width: 1100px)', '(max-width: 1500px)'])

  return (
    <Stack
      h="100vh"
      py="auto"
      display="flex"
      justifyContent="center"
      mx={isSmallThan1500 ? '24' : '80'}
    >
      <Flex as="header" alignItems="center" justifyContent="flex-end">
        <ColorModeSwitcher />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" gap="40" w="100%" direction={isSmallThan1100 ? 'column' : 'row'}>
        {children}
      </Flex>
    </Stack>
  )
}
