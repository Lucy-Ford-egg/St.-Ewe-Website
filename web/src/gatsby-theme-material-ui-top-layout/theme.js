import { createTheme, responsiveFontSizes } from "@mui/material"

const clientSpacing = [0, 8, 12, 14, 16, 20, 24, 28, 33, 35, 41, 48, 50, 58, 67, 72, 84, 96, 102]

let defaultTheme = createTheme({
  spacing: [...clientSpacing],
  palette: {
    primary: {
      main: '#d63544',
    },
    secondary: {
      main: '#698f68',
    },
    text: {
      primary: 'rgba(93, 83, 64, 1)',
    },
    background: {
      default: '#f6f6ee',
    },
    white:{
      main: '#ffffff',
    }
  },
  typography: {
    fontFamily: [
         'League Spartan',
         'sans-serif',
       ].join(','),
    fontSize: 16,
    body1: {
      fontFamily: 'League Spartan',
      fontSize: 16,
      lineHeight: 1.43,
      letterSpacing: '0em',
    },
    body2: {
      fontFamily: 'League Spartan',
      fontSize: 14,
      letterSpacing: '0em',
    },
    button: {
      lineHeight: 1.43,
    },
    caption: {
      fontFamily: 'League Spartan',
      fontSize: 12,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    overline: {
      fontFamily: 'League Spartan',
      fontSize: 14,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: 41,
      fontFamily: 'Sentient',
    },
    h2: {
      fontSize: 35,
      fontFamily: 'Sentient',
    },
    h3: {
      fontSize: 25,
      fontFamily: 'Sentient',
    },
    h4: {
      fontSize: 24,
      fontFamily: 'Sentient',
      letterSpacing: '0em',
    },
    h5: {
      fontSize: 20,
      fontFamily: 'Sentient',
    },
    h6: {
      fontSize: 17,
      fontFamily: 'Sentient',
      letterSpacing: '0em',
    },
  },
  // palette: {
  //   primary: {
  //     main: "#C3B187", // Gold
  //     mid: "#BFAD83",
  //     dark: "#B8A67D",
  //     accessible: "#83744d" // Accessible gold for small type
  //   },
  //   secondary: {
  //     main: '#2E2E2E', // Black
  //     light: '#101010'
  //   },
  //   tertiary: {
  //     main: '#987284', //
  //   },
  //   white: {
  //     main: '#ffffff'
  //   },
  // },
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
  // typography: {
  //   fontFamily: [
  //     'Montserrat',
  //     'sans-serif',
  //   ].join(','),
  //   color: "black",
  //   backgroundColor: "white",
  //   h1:{
  //     fontSize: 74,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   h2:{
  //     fontSize: 51,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   h3:{
  //     fontSize: 34,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   h4:{
  //     fontSize: 24,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   h5:{
  //     fontSize: 19,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   h6:{
  //     fontSize: 16,
  //     fontFamily: 'PT Serif',
  //     fontWeight: 700,
  //   },
  //   subtitle1: {
  //     fontSize: 11,
  //     textTransform: 'uppercase',
  //     letterSpacing: 0.93
  //   },
  //   subtitle2:{
  //     fontSize: 16,
  //     fontWeight: 400,
  //     textTransform: 'uppercase',
  //     letterSpacing: 0.93
  //   },
  //   body1:{
  //     fontSize: 16,
  //     lineHeight: 2.14
  //   },
  //   body2:{
  //     fontSize: 16,
  //     lineHeight: 2.14,
  //     fontWeight: 700
  //   },
  //   caption:{
  //     fontSize: 11,
  //     lineHeight: 2.14
  //   },
  //   overline:{
  //     fontSize: 16,
  //     textTransform: 'uppercase',
  //     letterSpacing: 0.93
  //   },
  // },
  palette: defaultTheme.palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: ` 
        
        // html{
        //   min-height:100%;
        //   position: relative;
        // }
        // #searchInput{
        //   &:focus {
        //     border: none;
        //     outline: none;
        //   }
        //   &::placeholder {
        //     font-size: 51px;
        //     font-family: "PT Serif";
        //   }
        //   font-size: 51px;
        //   font-family: "PT Serif";
        //   border: none;
        //   background-color: transparent;
        //   height: 51px;
        //   padding-top: 3rem;
        //   padding-bottom: 3rem;
        // } 
        // .scrollBar {
        //   scrollbar-color: red yellow;
        // }
        // a{
        //   color: inherit;
        //   text-decoration: none;
        // }
        // .link-animation{
        //   transition: all 0.2s ease-in 0s;
		    //   position: relative;
		    //   display: inline-block;
        //   text-decoration: none;
		    //   background-size: 0 100%;
		    //   transition: background-size .3s ease;
		    //   background-image: linear-gradient(transparent calc(100% - 1px),hsla(0,0%,100%,.5) 1px);
		    //   background-repeat: no-repeat;
		    //   cursor: pointer;
		    //   &:hover{
		    //   	background-size: 100% 100%;
		    //   	color: rgba(255,255,255,1);
        //     cursor: pointer;
		    //   }
        // }
        // .white-text{
        //   p, li{
        //     color: white;
        //   }
        //   .underline{
        //     border-bottom: 1px solid white;
        //   }
        //   .portableTextInlineLink{
        //     color: white;
        //     text-decoration: none;
        //     background-position: bottom 6px left 0px;

        //   }
        // }
        // *{
        //   border: 1px solid red;
        // }
      `
    },
    MuiContainer:{
      styleOverrides: {
        
      },
    },
    MuiTextFeild:{
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: 0,
          },
          borderRadius: 0
        }
      }
    },
    MuiPaper:{
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.background.default,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: 'League Spartan',
          borderRadius: 100,
          textTransform: 'unset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'max-content',
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(5)}`,
        },
        sizeLarge:{
          display: "flex",
          padding: "0.5rem 1.3125rem",
          justifyContent: "center",
          alignItems: "center",
          fontSize: defaultTheme.spacing(4)
        },
        outlineTertiary:{
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.default,
          border: `1px solid ${defaultTheme.palette.text.primary}`,
          '&:hover':{
            cursor: 'pointer'
          },
        },
        textPrimary:{
          color: defaultTheme.palette.text.primary,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          '&:hover':{
            color: defaultTheme.palette.text.primary,
            backgroundColor: 'transparent'
          },
        },
        containedPrimary: {
          color: 'white',
          backgroundColor: defaultTheme.palette.primary.main,
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