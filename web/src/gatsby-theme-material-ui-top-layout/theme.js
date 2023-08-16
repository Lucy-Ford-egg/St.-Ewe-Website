import { createTheme, responsiveFontSizes } from "@mui/material"

const clientSpacing = [0, 9, 11, 13, 16, 24, 34, 41, 51, 61, 74, 109, 159]

let defaultTheme = createTheme({
  spacing: [...clientSpacing],
  palette: {
    primary: {
      main: "#C3B187", // Gold
      mid: "#BFAD83",
      dark: "#B8A67D",
      accessible: "#83744d" // Accessible gold for small type
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
      fontFamily: 'Prociono',
      fontWeight: 700,
    },
    h2:{
      fontSize: 51,
      fontFamily: 'Prociono',
      fontWeight: 700,
    },
    h3:{
      fontSize: 34,
      fontFamily: 'Prociono',
      fontWeight: 700,
    },
    h4:{
      fontSize: 24,
      fontFamily: 'Prociono',
      fontWeight: 700,
    },
    h5:{
      fontSize: 19,
      fontFamily: 'Prociono',
      fontWeight: 700,
    },
    h6:{
      fontSize: 16,
      fontFamily: 'Prociono',
      fontWeight: 700,
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
  palette: defaultTheme.palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: ` 
        
        html{
          min-height:100%;
          position: relative;
        }
        #searchInput{
          &:focus {
            border: none;
            outline: none;
          }
          &::placeholder {
            font-size: 51px;
            font-family: "Prociono";
          }
          font-size: 51px;
          font-family: "Prociono";
          border: none;
          background-color: transparent;
          height: 51px;
          padding-top: 3rem;
          padding-bottom: 3rem;
        } 
        .scrollBar {
          scrollbar-color: red yellow;
        }
        a{
          color: inherit;
          text-decoration: none;
        }
        .link-animation{
          transition: all 0.2s ease-in 0s;
		      position: relative;
		      display: inline-block;
          text-decoration: none;
		      background-size: 0 100%;
		      transition: background-size .3s ease;
		      background-image: linear-gradient(transparent calc(100% - 1px),hsla(0,0%,100%,.5) 1px);
		      background-repeat: no-repeat;
		      cursor: pointer;
		      &:hover{
		      	background-size: 100% 100%;
		      	color: rgba(255,255,255,1);
            cursor: pointer;
		      }
        }
        .white-text{
          p, li{
            color: white;
          }
          .underline{
            border-bottom: 1px solid white;
          }
          .portableTextInlineLink{
            color: white;
            text-decoration: none;
            background-position: bottom 6px left 0px;

          }
        }
        .#2E2E2E-text{
          p, li{
            color: #2E2E2E;
          }
          .underline{
            border-bottom: 1px solid #2E2E2E;
          }
          .portableTextInlineLink{
            color: #2E2E2E;
            text-decoration: none;
            background-position: bottom 6px left 0px;

          }
        }
        // Inforced module spacing
        .section{
          &:first-child{
            &.carousel{
              margin-top: 0 !important;
            }
            &.titleSubtitleText{
              padding-top: ${defaultTheme.spacing(9)} !important;
            }
            &.posts{
              padding-top: 0 !important;
            }
          }
          &.map{
            & + .multiColumnTitleTextLink{
              margin-top: 0 !important;
            }
          }
          &.multiColumnTitleTextLink{
            & + .map{
              margin-top: 0 !important;
            }
            & + .carousel{
              margin-top: 0 !important;
            }
          }
          
          &.imageCaption{
            & + .text{
              padding-top: ${defaultTheme.spacing(9)} !important;
            }
            &.xl-withCaption{
              & + .text{
                padding-top: ${defaultTheme.spacing(6)} !important;
              }
            }
          }

          &.titleSubtitleText{
            & + .imageCaption{
              margin-top: ${defaultTheme.spacing(9)} !important;
            }
            & + .placesGrid{
              padding-top: ${defaultTheme.spacing(9)} !important;
            }
            & + .component-postsGrid{
              padding-top: ${defaultTheme.spacing(9)} !important;
            }
          }
        }
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'unset',
          display: 'block',
          width: 'max-content',
          minWidth: 145,
          padding: `${defaultTheme.spacing(2)} ${defaultTheme.spacing(5)}`
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