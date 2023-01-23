import { createTheme } from "@mui/material"

const clientTheme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
    color: "black",
    backgroundColor: "white",
  },
  palette: {
    primary: {
      main: "#C3B187", // Gold
    },
    secondary: {
      main: '#2E2E2E', // Black
      light: '#101010'
    },
    tertiary: {
      main: '#987284', //
    },
    white: {
      main: '#ffffff'
    },
  },
});

export default clientTheme