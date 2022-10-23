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

export default function BookCard() {
  const { colorMode } = useColorMode()
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
        src=""
        fallbackSrc="https://via.placeholder.com/250"
        alt="Do mil ao milhão"
        borderTopRadius="md"
      />
      <Stack direction="column" my="3.5" mx="4">
        <Stack direction="row">
          <Tag
            colorScheme="red"
            p={1.5}
            borderRadius={5}
            fontSize="2xs"
          >
            <TagLabel>Thiago Nigro</TagLabel>
          </Tag>
        </Stack>

        <Box pt="2">
          <Heading as="h2" size="s" mb="2" color={colorMode === 'dark' ? 'white' : 'orange.500'}>
            <LinkOverlay href="#">
              Do mil ao milhão sem contar o cafezinho
            </LinkOverlay>
          </Heading>

          <Text fontSize="xs" color="GrayText">
            3 Exemplares
          </Text>
        </Box>
      </Stack>
    </LinkBox>
  )
}
