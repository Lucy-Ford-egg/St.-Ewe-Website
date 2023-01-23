import { createTheme } from "@mui/material"
import blackerDisplayWoff from '../assets/fonts/blacker-display/Blacker-Display-Bold-trial.woff'

//Blacker-Display-Bold-trial.woff

const clientSpacing = [0, 9, 11, 13, 16, 24, 34, 41, 51, 61, 74,]

const clientTheme = createTheme({
  spacing: [...clientSpacing],
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
    color: "black",
    backgroundColor: "white",
    h1:{
      fontSize: 74,
      fontFamily: 'Blacker Display Bold',
    },
    h2:{
      fontSize: 51,
      fontFamily: 'Blacker Display Bold',
    },
    h3:{
      fontSize: 34,
      fontFamily: 'Blacker Display Bold',
    },
    h4:{
      fontSize: 24,
      fontFamily: 'Blacker Display Bold',
    },
    h5:{
      fontSize: 19,
      fontFamily: 'Blacker Display Bold',
    },
    h6:{
      fontSize: 16,
      fontFamily: 'Blacker Display Bold',
    },
    subtitle1: {
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.93
    },
    subtitle2:{
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.93
    },
    body1:{
      fontSize: 16,
      lineHeight: 2.14
    },
    body2:{
      fontSize: 16,
      lineHeight: 2.14,
      fontWeight: 700
    },
    button:{

    },
    caption:{
      fontSize: 11,
    },
    overline:{
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.93
    },
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
  components: {
    MuiCssBaseline: {
      styleOverrides: ` 
        @font-face {
          font-family: 'Blacker Display Bold';
          font-display: swap;
          font-style: normal;
          font-weight: normal;
          src: local('Blacker Display Bold'), url(${blackerDisplayWoff}) format('woff');
        }
      `,
    },
    
  },
  
});

export default clientTheme