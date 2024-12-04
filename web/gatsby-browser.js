import CustomLayout from "./wrapPageElement"

export const wrapPageElement = CustomLayout

export const onRouteUpdate = ({ location }) => {
  if (location && location.hash) {
    const element = document.querySelector(location.hash)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  } else {
    window.scrollTo(0, 0)
  }
}
