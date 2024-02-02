export const contrastColour = (backgroundColour) => {

  //backgroundColour.designSystemColor.color.hex === 
  let textColour = ''
  let iconColour = ''
  let buttonColour = ''
  const checkedColour = backgroundColour?.designSystemColor.title

  switch(checkedColour?.toLowerCase()) {
    case "dark blue": // Dark Blue
      textColour = "white.main"
      iconColour = "#ffffff"
      buttonColour = {contained: "primary"
,
outlined: "white"};     break;
    case "orange": // Orange
      textColour = "white.main"
      iconColour = "#ffffff"
      buttonColour = {contained: "tertiary",
      outlined: "white"};      break;
    case "navy": // Navy
      textColour = "white.main"
      iconColour = "#ffffff"
      buttonColour = {contained: "primary"
,
outlined: "secondary"};     break;
    case "sand": // Sand
      textColour = "text.main"
      iconColour = "#2A2C55"
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "light blue": // Light Blue
      textColour = "white.main"
      iconColour = "#2A2C55"
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "sea blue": // Sea Blue
      textColour = "text.main"
      iconColour = "#2A2C55"
      buttonColour = {contained: "primary",
      outlined: "tertiary"};      break;
    case "yellow": // Yeloow
      textColour = "text.main"
      iconColour = "#2A2C55"
      buttonColour = {contained: "tertiary",
      outlined: "tertiary"};      break;
    default:
      textColour = "text.main"
      iconColour = "#71A7AF"
      buttonColour = {contained: "secondary",
      outlined: "white"};
  }
  return {iconColour, textColour, buttonColour}
}