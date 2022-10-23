import { BreadcrumbLink } from '@chakra-ui/react'
import styled, { css } from 'styled-components'

interface RouteProps {
  active?: 'true' | 'false'
}

export const Route = styled(BreadcrumbLink)<RouteProps>`
  font-weight: 400;
  padding: 6px;
  border-radius: 4px;
  transition: all .3s ease;

  :hover {
    background: ${({ theme }) => theme.colors.whiteAlpha[100]};
  }

  ${({ active, theme }) => (active === 'true' && css`
    color: ${theme.colors.white};
    background: ${theme.colors.orange[500]};
    font-weight: 500;

    :hover {
      background: ${theme.colors.orange[500]};
    }
  `)}
`
