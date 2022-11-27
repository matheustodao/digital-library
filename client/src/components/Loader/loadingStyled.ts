import styled from 'styled-components'

interface ICommonProps {
  shadowColor: string
}

interface LoaderDivProps extends ICommonProps {
  sizeParentWidth: number
  sizeParentHeight: number
  sizeParentBeforeWidth: number
  sizeParentShadow1: number
  sizeParentShadow2: number
}

interface StyledDivProps extends ICommonProps {
  sizeDivBorderRadius: number
  background: string
}

export const ParentDiv = styled.div`
  -webkit-font-smoothing: antialiased;
  display: flex;
  font-family: "Roboto", Arial;
  padding: 20px;
`

interface StyledInnerSVGProps {
  sizeSVGWidth: number
  sizeSVGHeight: number
}

interface StyleLiProps {
  pageColor: string
  sizeLi: number
  duration: number | string
  foldPageColor: string
  sizeText: number
  textColor: string
}

export const LoaderDiv = styled.div<LoaderDivProps>`
  width: ${(props) => props.sizeParentWidth}px;
  height: ${(props) => props.sizeParentHeight}px;
  position: relative;
  &:before {
    --r: -6deg;
    content: "";
    position: absolute;
    width: ${(props) => props.sizeParentBeforeWidth}px;
    box-shadow: 0 ${(props) => props.sizeParentShadow1}px
      ${(props) => props.sizeParentShadow2}px ${(props) => props.shadowColor};
    transform: rotate(var(--r));
  }
  &:after {
    --r: -6deg;
    content: "";
    position: absolute;
    box-shadow: 0 ${(props) => props.sizeParentShadow1}px
      ${(props) => props.sizeParentShadow2}px ${(props) => props.shadowColor};
    transform: rotate(var(--r));
    --r: 6deg;
  }
`

export const StyledDiv = styled.div<StyledDivProps>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.sizeDivBorderRadius}px;
  position: relative;
  z-index: 1;
  perspective: 600px;
  box-shadow: 0 4px 6px ${(props) => props.shadowColor};
  background-image: ${(props) => props.background};
`

export const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
`

export const StyledInnerSVG = styled.svg<StyledInnerSVGProps>`
  width: ${(props) => props.sizeSVGWidth}px;
  height: ${(props) => props.sizeSVGHeight}px;
  display: block;
`

export const StyledLi = styled.li<Omit<StyleLiProps, 'foldPageColor' | 'textColor' | 'sizeText'>>`
  --r: 180deg;
  --o: 0;
  --c: ${(props) => props.pageColor};
  position: absolute;
  top: ${(props) => props.sizeLi}px;
  left: ${(props) => props.sizeLi}px;
  transform-origin: 100% 50%;
  color: var(--c);
  opacity: var(--o);
  transform: rotateY(var(--r));
  animation: ${(props) => props.duration} ease infinite;
`

export const StyledLi1 = styled(StyledLi)`
  --r: 0deg;
  --o: 1;
`

export const StyledLi2 = styled(StyledLi)<Pick<StyleLiProps, 'foldPageColor'>>`
  @keyframes page-2 {
    0% {
      transform: rotateY(180deg);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    35%,
    100% {
      opacity: 0;
    }
    50%,
    100% {
      transform: rotateY(0deg);
    }
  }
  --c: ${(props) => props.foldPageColor};
  animation-name: page-2;
`

export const StyledLi3 = styled(StyledLi)<Pick<StyleLiProps, 'foldPageColor'>>`
  @keyframes page-3 {
    15% {
      transform: rotateY(180deg);
      opacity: 0;
    }
    35% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
    65%,
    100% {
      transform: rotateY(0deg);
    }
  }
  --c: ${(props) => props.foldPageColor};
  animation-name: page-3;
`

export const StyledLi4 = styled(StyledLi)<Pick<StyleLiProps, 'foldPageColor'>>`
  @keyframes page-4 {
    30% {
      transform: rotateY(180deg);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    65%,
    100% {
      opacity: 0;
    }
    80%,
    100% {
      transform: rotateY(0deg);
    }
  }
  --c: ${(props) => props.foldPageColor};
  animation-name: page-4;
`

export const StyledLi5 = styled(StyledLi)<Pick<StyleLiProps, 'foldPageColor'>>`
  @keyframes page-5 {
    45% {
      transform: rotateY(180deg);
      opacity: 0;
    }
    65% {
      opacity: 1;
    }
    80%,
    100% {
      opacity: 0;
    }
    95%,
    100% {
      transform: rotateY(0deg);
    }
  }
  --c: ${(props) => props.foldPageColor};
  animation-name: page-5;
`

export const StyledLi6 = styled(StyledLi)`
  --o: 1;
`

export const StyledSpan = styled.span<Pick<StyleLiProps, 'textColor' | 'sizeText'>>`
  display: block;
  top: 100%;
  font-size: ${(props) => props.sizeText}px;
  margin-top: 20px;
  text-align: center;
  color: ${(props) => props.textColor};
`
