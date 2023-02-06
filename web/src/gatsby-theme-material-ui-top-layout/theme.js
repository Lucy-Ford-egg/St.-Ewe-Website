import { createTheme, responsiveFontSizes } from "@mui/material"
import blackerDisplayWoff from '../assets/fonts/blacker-display/Blacker-Display-Bold-trial.woff'


const clientSpacing = [0, 9, 11, 13, 16, 24, 34, 41, 51, 61, 74,]

let defaultTheme = createTheme({
  spacing: [...clientSpacing]
})

let clientTheme = createTheme({
  spacing: [...clientSpacing],
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 900,
      lg: 1200,
      xl: 1330 ,
      xxl: 1440
    }
  },
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
      fontWeight: 400,
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
      lineHeight: 2.14
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
      mid: "#BFAD83",
      dark: "#B8A67D",
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
        .scrollBar {
          scrollbar-color: red yellow;
        }
        // *{
        //   border: 1px solid red;
        // }
        
       
      `
    },
    MuiContainer:{
      styleOverrides: {
        maxWidthXl:{
          paddingLeft: 30,
          paddingRight: 30,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'unset',
          display: 'block',
          width: 'max-content',
          padding: `${defaultTheme.spacing(2)} ${defaultTheme.spacing(5)}`
        },
        containedPrimary: {
          color: 'white',
          '&:hover':{
            cursor: 'pointer'
          },
        },
      }
    }
  },
});

clientTheme = responsiveFontSizes(clientTheme);

export default clientTheme