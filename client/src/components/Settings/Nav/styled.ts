import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

interface RouteProps {
  active: 'true' | 'false'
}

export const WrapperRoutes = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  li {
    list-style: none;
    width: 100%;
  }
`

export const Route = styled(Link)<RouteProps>`
  transition: all .8s ease;
  display: flex;
  width: 100%;
  padding: 8px 16px;
  border-radius: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.orange[300]};
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ active }) => (active === 'true' && css`
    background: ${({ theme }) => theme.colors.orange[300]};
    color: ${({ theme }) => theme.colors.white};
  `)}
`
