import { BreadcrumbLink } from '@chakra-ui/react'
import styled, { css } from 'styled-components'

interface RouteProps {
  active?: 'true' | 'false'
}

export const Wrapper = styled.div`
  .menu {
    @media (max-width: 680px) {
      display: none;
    }
  }

  .hamburger {
    display: none;
    @media (max-width: 680px) {
      display: flex;
    }
  }
`

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

export const Routes = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  gap: 24px;
  li {
    width: 100%;
    list-style: none;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      width: 100%;
    }
  }
`
