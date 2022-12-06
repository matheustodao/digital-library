import { Image, useColorModeValue } from '@chakra-ui/react'

import { logosMocks } from './mock'

type LogoSize = 'lg' | 'md' | 'sm'

interface logoWithDetails {
  size: LogoSize
  variant: 'details'
}

interface logoNoDetails {
  variant: 'no-details'
  size: 'lg' | 'sm'
}

type LogoProps = logoNoDetails | logoWithDetails

export default function Logo(props: LogoProps) {
  const { variant, size } = props

  const logo: { width: number, height: number, src: any } = variant === 'no-details'
    ? useColorModeValue(logosMocks['no-details'].white[size], logosMocks['no-details'].dark[size])
    : useColorModeValue(logosMocks.white[size], logosMocks.dark[size])
  return (
    <Image
      width={`${logo.width}px`}
      height={`${logo.height}px`}
      src={logo.src}
    />
  )
}
