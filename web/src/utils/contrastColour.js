import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'

export const contrastColour = (backgroundColour) => {

  //backgroundColour.designSystemColor.color.hex === 
  let textColour = ''
  let svg = ''
  let divider = ''
  let buttonColour = ''

  const checkedColour = backgroundColour.label

  switch(checkedColour?.toLowerCase()) {
    case "navy": //Navy
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

      divider = {
        mui: "white.main",
        hex: clientTheme.palette.white.main,
      }
      
      buttonColour = {contained: "primary"
,
outlined: "white"};     break;
    case "orange": // Orange
      textColour = "white.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "tertiary",
      outlined: "white"};      break;
    case "navy": // Navy
      textColour = "white.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "primary"
,
outlined: "secondary"};     break;
    case "sand": // Sand
      textColour = "text.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "light blue": // Light Blue
      textColour = "white.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "sea blue": // Sea Blue
      textColour = "text.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "yellow": // Yeloow
      textColour = "text.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "tertiary",
      outlined: "tertiary"};      break;
    default:
      textColour = "text.main"
      svg = {
        default: "#ffffff"
      }
      buttonColour = {contained: "secondary",
      outlined: "white"};
  }
  return {svg, divider, textColour, buttonColour}
}