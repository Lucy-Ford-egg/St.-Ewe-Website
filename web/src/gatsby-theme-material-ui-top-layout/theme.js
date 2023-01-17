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
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        textTransform: "unset"
      },
    },
    '& .MuiButtonBase-root':{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        textTransform: "unset"
    }
  },
});

export default clientTheme