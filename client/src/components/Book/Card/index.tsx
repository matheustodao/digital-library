import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
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

import { BookParams } from '@type/book'

interface BookCardProps {
  book: BookParams
}

const BookCard = forwardRef(({ book }: BookCardProps, ref) => {
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
      transition="all .302s ease"
      _hover={{
        transform: 'scale(1.05)'
      }}
      flex="1 1 210px"
      ref={ref as never}
    >
      <Image
        width="100%"
        maxH="250px"
        h="250px"
        objectFit="cover"
        src={book.cover}
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
            <LinkOverlay as={Link} to={`/books/${book.id}`}>
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
})

export default BookCard
