import { createTheme, responsiveFontSizes } from "@mui/material"

const clientSpacing = [0, 8, 12, 14, 16, 20, 24, 28, 33, 35, 41, 48, 50, 58, 67, 72, 84, 96, 102]

let defaultTheme = createTheme({
  spacing: [...clientSpacing],
  breakpoints:{
    values: {
      xs: 0,
      sm: 600,
      md: 1013,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#d63544',
      light: '#FFEBEB'
    },
    secondary: {
      main: '#f6f6ee',
    },
    tertiary: {
      main: 'rgba(93, 83, 64, 1)',
    },
    text: {
      primary: 'rgba(93, 83, 64, 1)',
    },
    background: {
      default: '#f6f6ee',
      main: '#f6f6ee',
    },
    white:{
      main: '#ffffff',
    },
    highlight: {
      main: '#698f68',
    },
    yellow: {
      main: '#F6C305',
      light: 'rgba(93, 83, 64, 0.4)'
    }
  },
  typography: {
    fontSize: 16,
    body1: {
      fontFamily: 'League Spartan',
      fontSize: 16,
      lineHeight: 1.5,
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
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    h1: {
      fontSize: clientSpacing[15],
      fontFamily: 'Sentient-Bold',
    },
    h2: {
      fontSize: clientSpacing[11],
      fontFamily: 'Sentient-Bold',
    },
    h3: {
      fontSize: clientSpacing[9],
      fontFamily: 'Sentient-Bold',
    },
    h4: {
      fontSize: clientSpacing[7],
      fontFamily: 'Sentient-Bold',
      letterSpacing: '0em',
    },
    h5: {
      fontSize: clientSpacing[5],
      fontFamily: 'Sentient-Bold',
    },
    h6: {
      fontSize: clientSpacing[4],
      fontFamily: 'Sentient-Bold',
      letterSpacing: '0em',
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
      lg: 1180,
      xl: 1300 ,
      xxl: 1440
    }
  },
  typography: defaultTheme.typography,
  palette: defaultTheme.palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        // *{
        //   border: 1px solid tomato;
        // }
        @keyframes arrowAnimation {
          0%,
          50%,
          100% {
            translateX: 10px;
            opacity: 1
          }
          25%,
          75% {
            translateX: 0px;
            opacity: 0.2
          }
        }
        
      `
    },
    MuiContainer:{
      styleOverrides: {
        
      },
    },
    MuiAccordion:{
      styleOverrides:{
        root: {
          paddingBottom: 4,
          "&:before": {
            backgroundColor: defaultTheme.palette.background.default,
            opacity: '1 !important',
          },
          
        },
      },
    },
    MuiAccordionSummary:{
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse',
          columnGap: 10,
          padding: 0,
        },
      },
    },
    MuiAccordionDetails:{
      styleOverrides:{
        root: {
          padding: 0,
        }
      }
    },
    MuiDivider:{
      styleOverrides:{
        root: {
          borderColor: defaultTheme.palette.tertiary.main,
        },
        light:{
          borderColor: defaultTheme.palette.background.default,
        },
        accent:{
          borderColor: defaultTheme.palette.primary.main,
        }
      },
    },
    MuiFilledInput:{
      styleOverrides:{
        root: {
          backgroundColor: defaultTheme.palette.white.main,
        },
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
    MuiIconButton:{
      styleOverrides:{
        root:{

        },
        colorPrimary:{
          backgroundColor: defaultTheme.palette.background.default,
          '&:disabled':{
            opacity: 0.3,
            backgroundColor: defaultTheme.palette.background.default,
          }
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
          fontWeight: 400,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(5)}`,
        },
        sizeLarge:{
          display: "flex",
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(5)}`, //"0.5rem 1.3125rem",
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
        outlineSecondary:{
          color: defaultTheme.palette.background.main,
          backgroundColor: 'transparent',
          border: `1px solid ${defaultTheme.palette.background.main}`,
          '&:hover':{
            cursor: 'pointer'
          },
        },
        textPrimary:{
          color: defaultTheme.palette.primary.main,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          '&:hover':{
            color: defaultTheme.palette.tertiary.main,
            backgroundColor: 'transparent',
            '& .MuiSvgIcon-root':{
              color: defaultTheme.palette.tertiary.main,
              // animation: 'arrowAnimation 2s ease 0s infinite normal forwards',
              // transition: 'all 0.2s ease-in-out 0s',
            },
          },
        },
        textTertiary:{
          color: defaultTheme.palette.tertiary.main,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          '&:hover':{
            color: defaultTheme.palette.tertiary.main,
            backgroundColor: 'transparent'
          },
        },
        containedPrimary: {
          color: 'white',
          backgroundColor: defaultTheme.palette.primary.main,
          '&:hover':{
            cursor: 'pointer',
            
          },
        },
      }
    },
    MuiTypography:{
      styleOverrides:{
        root:{},
        h2:{
          [defaultTheme.breakpoints.up('xs')]: {
            paddingTop: `${defaultTheme.spacing(6)} !important`,
            paddingBottom: `${defaultTheme.spacing(6)} !important`,
            marginTop: 0,
            marginBottom: 0,
            },
          [defaultTheme.breakpoints.up('md')]: {
          paddingTop: `${defaultTheme.spacing(6)} !important`,
          paddingBottom: `${defaultTheme.spacing(6)} !important`,
          marginTop: 0,
          marginBottom: 0,
          },
        },
      },
    }
  },
});

clientTheme = responsiveFontSizes(clientTheme);

export default clientTheme