/* eslint-disable react/prop-types */
import { useMediaQuery } from '@chakra-ui/react'
import { LoaderDiv, ParentDiv, StyledDiv, StyledInnerSVG, StyledLi1, StyledLi2, StyledLi3, StyledLi4, StyledLi5, StyledLi6, StyledSpan, StyledUl } from './loadingStyled'

interface BookLoadingProps {
  className?: string
  text?: string
  background?: string
  shadowColor?: string
  textColor?: string
  pageColor?: string
  foldPageColor?: string
  duration?: string
  size?: string
  desktopSize?: string
  mobileSize?: string
}

const BookLoading = ({
  className = 'bookloader',
  text = 'Loading...',
  background = 'linear-gradient(135deg, #23c4f8, #275efe)',
  shadowColor = 'rgba(39, 94, 254, .28)',
  textColor = '#6c7486',
  pageColor = 'rgba(255, 255, 255, .36)',
  foldPageColor = 'rgba(255, 255, 255, .52)',
  duration = '3s',
  size = '64px',
  desktopSize = '',
  mobileSize = ''
}: BookLoadingProps) => {
  const [isDesktopOrLaptop] = useMediaQuery('(min-width: 1224px)')
  const [isTabletOrMobile] = useMediaQuery('(max-width: 1224px)')

  let sizeFound = 0.0
  if (isDesktopOrLaptop) {
    if (desktopSize !== '') sizeFound = parseFloat(desktopSize)
    else sizeFound = parseFloat(size) * 2
  }

  if (isTabletOrMobile) {
    if (mobileSize !== '') sizeFound = parseFloat(mobileSize)
    else sizeFound = parseFloat(size)
  }

  const sizePassed = parseFloat(sizeFound.toString())
  const ratio = sizePassed / 64
  const sizeParentBeforeWidth = (sizePassed * 120) / 64
  const sizeParentWidth = (sizePassed * 200) / 64
  const sizeParentHeight = (sizePassed * 140) / 64
  const sizeParentShadow1 = (sizePassed * 16) / 64
  const sizeParentShadow2 = (sizePassed * 12) / 64
  const sizeDivBorderRadius = (sizePassed * 13) / 64
  const sizeLi = (sizePassed * 10) / 64
  const sizeSVGWidth = (sizePassed * 90) / 64
  const sizeSVGHeight = (sizePassed * 120) / 64
  let sizeText = (ratio * 1.5 * 20) / 2
  if (ratio === 1) {
    sizeText = 14
  }

  return (
    <ParentDiv className={className}>
      <LoaderDiv
        sizeParentShadow1={sizeParentShadow1}
        sizeParentShadow2={sizeParentShadow2}
        sizeParentBeforeWidth={sizeParentBeforeWidth}
        sizeParentWidth={sizeParentWidth}
        sizeParentHeight={sizeParentHeight}
        shadowColor={shadowColor}
        className="loader"
      >
        <StyledDiv
          sizeDivBorderRadius={sizeDivBorderRadius}
          shadowColor={shadowColor}
          background={background}
        >
          <StyledUl>
            <StyledLi1
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi1>
            <StyledLi2
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
              foldPageColor={foldPageColor}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi2>
            <StyledLi3
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
              foldPageColor={foldPageColor}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi3>
            <StyledLi4
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
              foldPageColor={foldPageColor}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi4>
            <StyledLi5
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
              foldPageColor={foldPageColor}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi5>
            <StyledLi6
              sizeLi={sizeLi}
              pageColor={pageColor}
              duration={duration}
            >
              <StyledInnerSVG
                sizeSVGWidth={sizeSVGWidth}
                sizeSVGHeight={sizeSVGHeight}
                viewBox="0 0 90 120"
                fill="currentColor"
              >
                <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
              </StyledInnerSVG>
            </StyledLi6>
          </StyledUl>
        </StyledDiv>
        <StyledSpan sizeText={sizeText} textColor={textColor}>
          {text}
        </StyledSpan>
      </LoaderDiv>
    </ParentDiv>
  )
}

export default BookLoading
