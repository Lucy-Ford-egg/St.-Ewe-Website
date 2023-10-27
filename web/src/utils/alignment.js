export const textAlignToJustifyContent = (textAlign) => {
  let justify = 'flex-start'
  switch(textAlign) {
    case "left":
      justify = "flex-start"
      break;
    case "center":
      justify = "center"
      break;
    case "right":
      justify = "flex-end"
      break;
    default:
      justify = "flex-start"
  }
  return justify
}