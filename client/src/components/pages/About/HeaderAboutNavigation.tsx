import { Button, Flex } from '@chakra-ui/react'
import { ArrowLeft, PencilSimpleLine } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  onEditionClick: () => void
}

export default function HeaderNavigationAbout({ onEditionClick }: IProps) {
  const navigate = useNavigate()

  return (
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      <Button
        onClick={() => navigate(-1)}
        color="blackAlpha.700"
        bgColor="gray.200"
        _hover={{ bg: 'gray.300' }}
        size="lg"
        iconSpacing={6}
        leftIcon={<ArrowLeft size={32} />}
      >
        Voltar
      </Button>

      <Button
        onClick={() => onEditionClick()}
        size="lg"
        iconSpacing={6}
        leftIcon={<PencilSimpleLine size={32} />}
        _hover={{ bg: 'orange.600' }}
        bgColor="orange.500"
        color="white"
        fontWeight="semibold"
      >
        Editar
      </Button>
    </Flex>
  )
}
