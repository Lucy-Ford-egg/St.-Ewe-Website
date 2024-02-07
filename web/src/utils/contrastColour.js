import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'

export const contrastColour = (backgroundColour) => {

  //backgroundColour.designSystemColor.color.hex === 
  let textColour = ''
  let svg = {}
  let divider = {}
  let buttonColour = {}
  let spiro = {}

  const checkedColour = backgroundColour?.label

  switch (checkedColour?.toLowerCase()) {
    //Navy
    case "navy": 
      textColour = "white.main"
      svg = {
        default: {
          mui: "primary",
          hex: clientTheme.palette.primary.main,
        },
        active: {
          mui: "text.mid",
          hex: clientTheme.palette.text.mid,
        }
      }
      spiro = {
        fill: clientTheme.palette.white.main,
        opacity: 0.4,
      }
      divider = {
        mui: "white.main",
        hex: clientTheme.palette.white.main,
      }
      buttonColour = {
        contained: "primary"
        ,
        outlined: "white"
      }; break;
      // Mid Navy
      case "mid navy": 
      textColour = "white.main"
      svg = {
        default: {
          mui: "primary",
          hex: clientTheme.palette.primary.main,
        },
        active: {
          mui: "text.mid",
          hex: clientTheme.palette.text.mid,
        }
      }
      spiro = {
        fill: clientTheme.palette.white.main,
        opacity: 0.4,
      }
      divider = {
        mui: "white.main",
        hex: clientTheme.palette.white.main,
      }
      buttonColour = {
        contained: "primary"
        ,
        outlined: "white"
      }; break;
      // Coral
    case "coral": 
    textColour = "white.main"
    svg = {
      default: {
        mui: "secondary",
        hex: clientTheme.palette.secondary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.primary.lighter,
      opacity: 1,
    }
    divider = {
      mui: "white.main",
      hex: clientTheme.palette.white.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
       // Coral Light
    case "coral light": 
    textColour = "white.main"
    svg = {
      default: {
        mui: "secondary",
        hex: clientTheme.palette.secondary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.primary.lightest,
      opacity: 1,
    }
    divider = {
      mui: "white.main",
      hex: clientTheme.palette.white.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
 // Light Grey
    case "light grey":
      textColour = "secondary.main"
    svg = {
      default: {
        mui: "primary",
        hex: clientTheme.palette.primary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.secondary.main,
      opacity: 0.4,
    }
    divider = {
      mui: "primary.main",
      hex: clientTheme.palette.primary.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
       // Text Grey
    case "text grey":
      textColour = "white.main"
    svg = {
      default: {
        mui: "primary",
        hex: clientTheme.palette.primary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.white.main,
      opacity: 0.4,
    }
    divider = {
      mui: "white.main",
      hex: clientTheme.palette.white.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
       // White
    case "white":
      textColour = "secondary.main"
    svg = {
      default: {
        mui: "primary",
        hex: clientTheme.palette.primary.main,
      },
      active: {
        mui: "white.main",
        hex: clientTheme.palette.white.main,
      }
    }
    spiro = {
      fill: clientTheme.palette.secondary.main,
      opacity: 0.4,
    }
    divider = {
      mui: "secondary.main",
      hex: clientTheme.palette.secondary.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
      // Yeloow
    case "yellow": 
    textColour = "text.main"
    svg = {
      default: {
        mui: "primary",
        hex: clientTheme.palette.primary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.primary.main,
      opacity: 1,
    }
    divider = {
      mui: "white.main",
      hex: clientTheme.palette.text.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    }; break;
    default:
      textColour = "text.main"
    svg = {
      default: {
        mui: "primary",
        hex: clientTheme.palette.primary.main,
      },
      active: {
        mui: "text.mid",
        hex: clientTheme.palette.text.mid,
      }
    }
    spiro = {
      fill: clientTheme.palette.primary.main,
      opacity: 1,
    }
    divider = {
      mui: "white.main",
      hex: clientTheme.palette.text.main,
    }
    buttonColour = {
      contained: "primary"
      ,
      outlined: "white"
    };
  }
  return { svg, spiro, divider, textColour, buttonColour }
}