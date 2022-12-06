import { Box, Flex } from '@chakra-ui/react'
import ReactDom from 'react-dom'
import BookLoading from './BookLoading'

const container = document.getElementById('loader-root') as any

export default function BookLoader() {
  return ReactDom.createPortal(
    <Box bg="blackAlpha.300" position="absolute" w="full" h="90vh" overflow="hidden" top="90px">
      <Flex alignItems="center" justifyContent="center" h="full">
        <BookLoading
          background="linear-gradient(135deg, #DD6B20, #DD6B20)"
          text=""
          desktopSize="80px"
          mobileSize="50px"
        />
      </Flex>
    </Box>,
    container
  )
};
