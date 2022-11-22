// Logos with Details
import logoWhite from '@assets/images/logos/logo-white.svg'
import logoDark from '@assets/images/logos/logo-dark.svg'

// Dark Logo No Details
import logoDarkNoDetails from '@assets/images/logos/logo-dark-no-details.svg'
import logoWhiteNoDetails from '@assets/images/logos/logo-white-no-details.svg'

export const logosMocks = {
  white: {
    lg: {
      src: logoWhite,
      width: 711,
      height: 215
    },

    md: {
      src: logoWhite,
      width: 243,
      height: 83
    },
    sm: {
      src: logoWhite,
      width: 178,
      height: 64
    }
  },

  dark: {
    lg: {
      src: logoDark,
      width: 711,
      height: 215
    },
    md: {
      src: logoDark,
      width: 243,
      height: 83
    },
    sm: {
      src: logoDark,
      width: 178,
      height: 64
    }
  },

  'no-details': {
    white: {
      lg: {
        src: logoWhiteNoDetails,
        width: 295,
        height: 53
      },

      sm: {
        src: logoWhiteNoDetails,
        width: 154,
        height: 28
      }
    },

    dark: {
      lg: {
        src: logoDarkNoDetails,
        width: 295,
        height: 53
      },

      sm: {
        src: logoDarkNoDetails,
        width: 154,
        height: 28
      }
    }
  }
}
