import styled from 'styled-components'

interface BulletProps {
  customColor: string
}

const Container = styled.div`
  border-radius: 10px;
  background: #fff;
  color: #252525;
  font-size: 12px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;

  box-shadow: 0px 4px 15px -3px rgba(0,0,0,0.1);

  span {
    color: #252525 !important;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`

const Bullet = styled.div<BulletProps>`
  width: 20px;
  height: 20px;
  border-radius: 20%;
  aspect-ratio: 1;
  background: ${({ customColor }) => !customColor ? '#8888' : customColor}
`

export const Tooltip = {
  Container,
  Bullet
}
