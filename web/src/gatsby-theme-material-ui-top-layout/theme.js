import { createTheme, responsiveFontSizes } from "@mui/material"

const clientSpacing = [0, 9, 12, 14, 16, 18, 20, 23, 26, 30, 34, 40, 46, 51, 58, 67, 75, 87, 98, 113, 127, 147]

let defaultTheme = createTheme({
  spacing: [...clientSpacing],
  breakpoints: {
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
      main: '#F04D5F', // Coral
      mid: '#F26979', // Crayola
      light: '#F47C8A', // Light Coral
      lighter: '#FCD9DE', // Lighter Coral
      lightest: '#FDE3E6', // Lightest Coral
    },
    secondary: {
      main: '#002856', // Navy
      mid: '#375073', // Navy Uncoated
      light: '#42608A', // Light Navy
    },
    tertiary: {
      main: 'rgba(93, 83, 64, 1)',
    },
    text: {
      primary: '#414042', // Text Grey
      mid: '#B8B6B9', // Mid Grey
    },
    background: {
      default: '#F3F3F2', // Light Grey
      main: '#002856',
    },
    white: {
      main: '#ffffff', // White
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
    fontSize: clientSpacing[5],
    body1: {
      fontFamily: 'Open Sans',
      fontSize: clientSpacing[5],
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    body2: {
      fontFamily: 'Open Sans',
      fontSize: clientSpacing[7],
      letterSpacing: '0em',
    },
    button: {
      lineHeight: 1.43,
    },
    caption: {
      fontFamily: 'Open Sans',
      fontSize: clientSpacing[3],
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    overline: {
      fontFamily: 'Open Sans',
      fontSize: clientSpacing[2],
      fontWeight: 400,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    h1: {
      fontSize: clientSpacing[15],
      fontFamily: 'Merriweather',
      fontWeight: 700,
    },
    h2: {
      fontSize: clientSpacing[13],
      fontFamily: 'Merriweather',
      fontWeight: 700,
    },
    h3: {
      fontSize: clientSpacing[10],
      fontFamily: 'Merriweather',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: clientSpacing[7],
      fontFamily: 'Merriweather',
      fontWeight: 700,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: clientSpacing[5],
      fontFamily: 'Merriweather',
      fontWeight: 700,
    },
    h6: {
      fontSize: clientSpacing[4],
      fontFamily: 'Merriweather',
      fontWeight: 700,
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
      xl: 1300,
      xxl: 1440
    }
  },
  transitions:{
    easing:{
      easeOut: "cubic-bezier(.08,.1,1,.99)",
      sharp: "cubic-bezier(.08,.1,1,.99)",
    },
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
    // MuiContainer: {
    //   styleOverrides: {
    //     root:{
    //       [defaultTheme.breakpoints.down('sm')]: {
    //         paddingLeft: `${defaultTheme.spacing(5)} !important`,
    //         paddingRight: `${defaultTheme.spacing(5)} !important`,
    //       },
    //     }
    //   },
    // },
    MuiAccordion: {
      styleOverrides: {
        root: {
          paddingBottom: 4,
          "&:before": {
            backgroundColor: defaultTheme.palette.background.default,
            opacity: '1 !important',
          },

        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          flexDirection: 'row-reverse',
          columnGap: 10,
          padding: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: defaultTheme.palette.tertiary.main,
        },
        light: {
          borderColor: defaultTheme.palette.background.default,
        },
        accent: {
          borderColor: defaultTheme.palette.primary.main,
        }
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.white.main,
        },
      },
    },
    MuiTextFeild: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: 0,
          },
          borderRadius: 0
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.background.default,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {

        },
        colorPrimary: {
          backgroundColor: defaultTheme.palette.background.default,
          '&:disabled': {
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
          fontFamily: 'Open Sans',
          borderRadius: 100,
          textTransform: 'uppercase',
          letterspacing: '0.075rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'max-content',
          fontWeight: 400,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(5)}`,
          fontSize: `${defaultTheme.spacing(2)} !important`,
        },
        sizeLarge: {
          display: "flex",
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(5)}`, //"0.5rem 1.3125rem",
          justifyContent: "center",
          alignItems: "center",
          fontSize: defaultTheme.spacing(4)
        },
        sizeSmall: {
          display: "flex",
          paddingTop: `${defaultTheme.spacing(2)} !important`, //"0.5rem 1.3125rem",
          paddingBottom: `${defaultTheme.spacing(2)} !important`,
          paddingLeft:`${defaultTheme.spacing(7)} !important`,
          paddingRight:`${defaultTheme.spacing(7)} !important`,
          justifyContent: "center",
          alignItems: "center",
        },
        outlineTertiary: {
          color: defaultTheme.palette.text.primary,
          backgroundColor: defaultTheme.palette.background.default,
          border: `1px solid ${defaultTheme.palette.text.primary}`,
          '&:hover': {
            cursor: 'pointer'
          },
        },
        outlineSecondary: {
          color: defaultTheme.palette.background.main,
          backgroundColor: 'transparent',
          border: `1px solid ${defaultTheme.palette.background.main}`,
          '&:hover': {
            cursor: 'pointer'
          },
        },
        textPrimary: {
          color: defaultTheme.palette.primary.main,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          '&:hover': {
            color: defaultTheme.palette.tertiary.main,
            backgroundColor: 'transparent',
            '& .MuiSvgIcon-root': {
              color: defaultTheme.palette.tertiary.main,
              // animation: 'arrowAnimation 2s ease 0s infinite normal forwards',
              // transition: 'all 0.2s ease-in-out 0s',
            },
          },
        },
        textTertiary: {
          color: defaultTheme.palette.tertiary.main,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          '&:hover': {
            color: defaultTheme.palette.tertiary.main,
            backgroundColor: 'transparent'
          },
        },
        containedPrimary: {
          color: 'white',
          backgroundColor: defaultTheme.palette.primary.main,
          '&:hover': {
            cursor: 'pointer',

          },
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
        h2: {
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
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.white.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0, 
        },
        notchedOutline:{
          border: `1px solid ${defaultTheme.palette.tertiary.main}`,
        },
      },
    },

    MuiCheckbox:{
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        colorPrimary:{
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          //backgroundColor: 'red',
        },
      },
    },
  },
});

clientTheme = responsiveFontSizes(clientTheme);

export default clientTheme