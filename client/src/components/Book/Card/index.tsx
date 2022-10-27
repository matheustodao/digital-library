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

import { BookParams } from '@type/digitalLibrary/book'

interface BookCardProps {
  book: BookParams
}

export default function BookCard({ book }: BookCardProps) {
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
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all .302s ease-in-out'
      }}
    >
      <Image
        width="100%"
        maxH="250px"
        h="250px"
        objectFit="cover"
        src={book.bookCover}
        fallbackSrc="https://via.placeholder.com/250"
        alt={book.title}
        borderTopRadius="md"
      />
      <Stack direction="column" my="3.5" mx="4">
        <Stack direction="row">
          {book.authors.slice(0, 3).map((author) => (
            <Tag
              key={author}
              colorScheme="red"
              p={1.5}
              borderRadius={5}
              fontSize="2xs"
            >
              <TagLabel>{author}</TagLabel>
            </Tag>
          ))}
        </Stack>

        <Box pt="2">
          <Heading as="h2" size="s" mb="2" color={colorMode === 'dark' ? 'white' : 'orange.500'} noOfLines={2}>
            <LinkOverlay href={`/books/${book.id}`}>
              {book.title}
            </LinkOverlay>
          </Heading>

          <Text fontSize="xs" color="GrayText">
            {book.quantity} Exemplares
          </Text>
        </Box>
      </Stack>
    </LinkBox>
  )
}
