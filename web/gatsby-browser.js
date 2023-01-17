// import "bootstrap/dist/js/bootstrap.min.js"
// import "@popperjs/core/dist/umd/popper.min.js"

// import "@fontsource/montserrat/400.css"
// import "@fontsource/montserrat/700.css"
// import "./src/fonts/blackerDisplay/style.css"
import React from "react"
import { ThemeProvider } from '@mui/material/styles';
import clientTheme from "./src/gatsby-theme-material-ui-top-layout/theme"

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={clientTheme}>
      {element}
    </ThemeProvider>
  )