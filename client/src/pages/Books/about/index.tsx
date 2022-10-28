import { Flex, Button, Stack } from '@chakra-ui/react'
import { CaretRight } from 'phosphor-react'
import BookView from 'src/components/Book/View'
import { BookViewContent } from 'src/components/Book/View/components/BookContent'
import HeaderNavigationAbout from 'src/components/pages/About/HeaderAboutNavigation'

export default function AboutBook() {
  return (
    <Stack maxW="896px" w="100%" mx="auto" width="100%" my="16" gap="32">
      <HeaderNavigationAbout onEditionClick={() => console.log('open')} />
      <BookView>
        <BookViewContent.Container>
          <Button variant="unstyled" h="min-content">
            <BookViewContent.Title>
              <Flex alignItems="center">
                Descrição
                <CaretRight />
              </Flex>
            </BookViewContent.Title>
          </Button>

          <BookViewContent.Text noOfLines={3}>
            Muita gente acha que a riqueza é apenas uma questão de nascer rico ou ter muita sorte. Mas a verdade é que é possível fazer seu dinheiro render e gerar riqueza. Você só precisa de informação
          </BookViewContent.Text>
        </BookViewContent.Container>
      </BookView>
    </Stack>
  )
}
