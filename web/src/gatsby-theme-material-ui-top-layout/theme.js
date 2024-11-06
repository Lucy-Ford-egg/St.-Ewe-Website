import { createTheme, responsiveFontSizes } from "@mui/material"
import { brandSpacing, brandPalette } from "./brandPalette"

const clientSpacing = Object.values(brandSpacing).map(item => item.value)

let defaultTheme = createTheme({
  spacing: [...clientSpacing],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: brandPalette["Rich Yolk Primary"].value, // Coral
      mid: "#F26979", // Crayola
      light: "#F47C8A", // Light Coral
      lighter: "#FCD9DE", // Lighter Coral
      lightest: "#FDE3E6", // Lightest Coral
    },
    secondary: {
      main: "#002856", // Navy
      bright: "#00397A", // Bright Navy
      mid: "#375073", // Navy Uncoated
      light: "#42608A", // Light Navy
    },
    tertiary: {
      main: "rgba(93, 83, 64, 1)",
    },
    text: {
      primary: "#002856", // Text Grey
      mid: "#B8B6B9", // Mid Grey
    },
    background: {
      default: "#ffffff", // White
      main: "#ffffff", // White
    },
    white: {
      main: "#ffffff", // White
    },
    highlight: {
      main: "#698f68",
    },
    yellow: {
      main: "#F6C305",
      light: "rgba(93, 83, 64, 0.4)",
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
      xl: 2880,
    },
  },
  transitions: {
    easing: {
      easeOut: "cubic-bezier(.08,.1,1,.99)",
      sharp: "cubic-bezier(.08,.1,1,.99)",
    },
  },
  typography: {
    //fontSize: clientSpacing[5],
    body1: {
      fontFamily: "Roboto Slab",
      fontSize: clientSpacing[6],
      lineHeight: 1.66,
      letterSpacing: "0em",
    },
    body2: {
      fontFamily: "Roboto Slab",
      fontSize: clientSpacing[7],
      letterSpacing: "0em",
    },
    button: {
      lineHeight: 1.43,
    },
    caption: {
      fontFamily: "Roboto Slab",
      fontSize: clientSpacing[6],
      lineHeight: 1.5,
      letterSpacing: "0em",
    },
    overline: {
      fontFamily: "Colby Narrow",
      fontSize: clientSpacing[7],
      fontWeight: 700,
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: 0.3,
    },
    h1: {
      fontFamily: "Colby Narrow",
      fontSize: clientSpacing[14],
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: 1,
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: clientSpacing[13],
      },
    },
    h2: {
      fontSize: clientSpacing[12],
      fontFamily: "Colby Narrow",
      [defaultTheme.breakpoints.up("md")]: {
        fontSize: clientSpacing[12],
      },
    },
    h3: {
      fontSize: clientSpacing[10],
      fontFamily: "Colby Narrow",
      lineHeight: 1.35,
      [defaultTheme.breakpoints.down("sm")]: {
        fontSize: clientSpacing[8],
      },
    },
    h4: {
      fontSize: clientSpacing[7],
      fontFamily: "Colby Narrow",
      letterSpacing: "0em",
    },
    h5: {
      fontSize: clientSpacing[6],
      fontFamily: "Colby Narrow",
    },
    h6: {
      fontSize: clientSpacing[6],
      lineHeight: 1,
      fontFamily: "Colby Narrow",
    },
  },
  palette: defaultTheme.palette,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
            --dabbling-duck-primary: rgb(39, 34, 78);
            --dabbling-duck-secondary: rgb(98, 94, 156);
            --grand-primary: rgb(132, 136, 134);
            --ms-1: 0.625rem;
            --ms-2: 0.875rem;
            --ms-3: 0.5625rem;
            --ms-4: 0.375rem;
            --ms-5: 0.3125rem;
            --ms-6: 0rem;
            --ms0: 1rem;
            --ms1: 1.4375rem;
            --ms2: 1.625rem;
            --ms3: 2.3125rem;
            --ms4: 2.625rem;
            --ms5: 3.6875rem;
            --ms6: 4.25rem;
            --ms7: 6rem;
            --ms8: 6.875rem;
            --ms9: 9.6875rem;
            --original-medium: rgb(153, 203, 235);
            --original-primary: rgb(38, 97, 171);
            --original-large: rgb(27, 46, 81);
            --quirky-quail-primary: rgb(59, 37, 22);
            --quirky-quail-secondary: rgb(252, 237, 222);
            --rich-yolk-opulent-hot-foil: rgb(229, 171, 74);
            --rich-yolk-opulent-primary: rgb(32, 32, 32);
            --rich-yolk-opulent-secondary: rgb(0, 0, 0);
            --rich-yolk-primary: rgb(235, 120, 6);
            --rich-yolk-secondary: rgb(252, 197, 1);
            --super-eggs-primary: rgb(0, 109, 105);
            --super-eggs-secondary: rgb(209, 224, 215);
            --super-eggs-secondary-accent: rgb(233, 85, 29);
            --super-eggs-secondary-dark: rgb(4, 91, 84);
            --white: rgb(255, 255, 255);
            --font-primary: 'Colby Narrow';
            --font-secondary: 'Roboto Slab';
        }
        

        // *{
        //   border: 1px solid tomato;
        // }

        // * Step Markers *//

        .step-marker{
          display: none;
        }
        /* width */
        ::-moz-scrollbar-button, ::-webkit-scrollbar-button {
          width: 0px;
          display: none;
        }
        *{
          box-sizing: border-box;
        }
::-webkit-scrollbar {
  width: var(--m-5);
  height: var(--m-5);
}

/* Track */
::-webkit-scrollbar-track {
  background: ${defaultTheme.palette.background.default};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var( --rich-yolk-primary);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--rich-yolk-secondary);
}
        @keyframes backToTopAnimation {
          0%,
          50%,
          100% {
            translateY: 50px;
            opacity: 1
          }
          25%,
          75% {
            translateY: 0px;
            opacity: 0.2
            filter: blur(5px);
          }
        }
        @keyframes blinker {
          50% {
            opacity: 0;
          }
        }
        a{
          color: inherit;
          text-decoration: none;
        }
        .backgroundWrapperClasses{
          position: fixed;
          z-index: 10;
          left: 0;
          right: 0;
          bottom: 0;
          padding: ${defaultTheme.spacing(6)};
          background-color: ${defaultTheme.palette.secondary.mid};
          display: flex;
          align-items: flex-end;
        }
        .cookie-notice {
          display: flex;
          column-gap: ${defaultTheme.spacing(6)};
          row-gap: ${defaultTheme.spacing(6)};
        }
        ${[defaultTheme.breakpoints.down("md")]}{
          .cookie-notice{
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
          }
        }
        .backgroundClasses{
          display: flex;
          column-gap: ${defaultTheme.spacing(12)};
        }
        ${[defaultTheme.breakpoints.down("sm")]}{
          .backgroundClasses{
            flex-direction: column;
          }
        }
        .buttonWrapperClasses{
          display: flex;
          column-gap: ${defaultTheme.spacing(6)};
          align-items: center;
        }
        .cookieButton{
          padding-top: ${defaultTheme.spacing(1)};
          padding-bottom: ${defaultTheme.spacing(1)};
          padding-left: ${defaultTheme.spacing(6)};
          padding-right: ${defaultTheme.spacing(6)};
          border-radius: 1000px;
          text-transform: uppercase;
          border: none;
          outline: none;
        }
        .buttonOutlined{
          background-color: transparent;
          border: 1px solid ${defaultTheme.palette.primary.main};
          color: ${defaultTheme.palette.primary.main};
        }
        .buttonTertiary{
          border: 1px solid ${defaultTheme.palette.white.main};
          color: ${defaultTheme.palette.white.main};
          align-self: center;
        }
        .acceptButtonClasses{
          background-color: ${defaultTheme.palette.primary.main};
          color: white;
        }
        .cookie-list{
          color: ${defaultTheme.palette.white.main};
        }
        .bg-cookie{
          .btn-primary, .btn-secondary {             
            outline: none;
            border: none;
            font-family: Open Sans;
            border-radius: 1000;
            text-transform: uppercase;
            letterspacing: 0.075rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: max-content;
            font-weight: 400;
            font-size: ${defaultTheme.spacing(2)}; 
            &:hover{
              cursor: pointer;
            }           
          }
          .btn-primary {
            color: ${defaultTheme.palette.white.main};
            background-color: ${defaultTheme.palette.primary.main};
          }
          .btn-secondary {
            color: ${defaultTheme.palette.white.main};
            background-color: transparent;
            border: 1px solid ${defaultTheme.palette.primary.main};
          }
          
          .float-end{
            display: flex;
            column-gap: 6;
          }
        }
      `,
    },
    MuiContainer: {
      styleOverrides: {
        root: {},
        maxWidthXl: {
          paddingLeft: `${defaultTheme.spacing(11)} !important`,
          paddingRight: `${defaultTheme.spacing(11)} !important`,
          [defaultTheme.breakpoints.down("lg")]: {
            paddingLeft: `${defaultTheme.spacing(11)} !important`,
            paddingRight: `${defaultTheme.spacing(11)} !important`,
          },
          [defaultTheme.breakpoints.down("md")]: {
            paddingLeft: `${defaultTheme.spacing(8)} !important`,
            paddingRight: `${defaultTheme.spacing(8)} !important`,
          },
          [defaultTheme.breakpoints.down("sm")]: {
            paddingLeft: `${defaultTheme.spacing(6)} !important`,
            paddingRight: `${defaultTheme.spacing(6)} !important`,
          },
        },
        maxWidthMd: {
          [defaultTheme.breakpoints.down("xl")]: {
            maxWidth: 864,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          paddingBottom: 4,
          "&:before": {
            backgroundColor: defaultTheme.palette.background.default,
            opacity: "1 !important",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          columnGap: 10,
          paddingTop: defaultTheme.spacing(6),
          paddingBottom: defaultTheme.spacing(6),
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingBottom: defaultTheme.spacing(11),
          [defaultTheme.breakpoints.down("sm")]: {
            paddingBottom: defaultTheme.spacing(10),
          },
        },
      },
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
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.white.main,
          "&:before": {
            borderBottom: "unset !important",
          },
        },
        underline: {
          borderBottomColor: "transparent !important",
        },
        input: {
          borderBottomColor: "transparent !important",
        },
      },
    },
    MuiTextFeild: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderRadius: 0,
          },
          borderRadius: 0,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: defaultTheme.spacing(0),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontSize: `${defaultTheme.spacing(2)} !important`,
          lineHeight: 1.5,
          letterSpacing: "0em",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {},
        colorPrimary: {
          backgroundColor: defaultTheme.palette.background.default,
          "&:disabled": {
            opacity: 0.3,
            backgroundColor: defaultTheme.palette.background.default,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Roboto Condensed",
          borderRadius: 100,
          textTransform: "uppercase",
          letterspacing: "2%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          fontWeight: 400,
          padding: `${defaultTheme.spacing(5)} ${defaultTheme.spacing(5)}`,
          fontSize: `${defaultTheme.spacing(5)} !important`,
          boxShadow: "none",
        },
        sizeLarge: {
          display: "flex",
          padding: `${defaultTheme.spacing(5)} ${defaultTheme.spacing(5)}`,
          justifyContent: "center",
          alignItems: "center",
          fontSize: defaultTheme.spacing(5),
        },
        sizeSmall: {
          display: "flex",
          padding: `${defaultTheme.spacing(4)} ${defaultTheme.spacing(5)}`,
          justifyContent: "center",
          alignItems: "center",
        },
        containedPrimary: {
          color: "white",
          //backgroundColor: defaultTheme.palette.primary.main,
          "&:hover": {
            cursor: "pointer",
          },
        },
        containedSecondary: {
          backgroundColor: "white",
          color: defaultTheme.palette.primary.main,
          "&:hover": {
            cursor: "pointer",
          },
        },
        outlinePrimary: {
          color: "var(--rich-yolk-primary)",
          backgroundColor: "transparent",
          border: `1px solid var(--rich-yolk-primary)`,
          "&:hover": {
            cursor: "pointer",
          },
        },
        outlineSecondary: {
          color: "var(--white)",
          backgroundColor: "transparent",
          border: `1px solid var(--white)`,
          "&:hover": {
            cursor: "pointer",
          },
        },
        outlineTertiary: {
          //color: defaultTheme.palette.text.primary,
          backgroundColor: "var(--original-large)",
          border: `1px solid var(--original-large)`,
          "&:hover": {
            cursor: "pointer",
          },
        },
        textPrimary: {
          color: defaultTheme.palette.primary.main,
          borderRadius: 0,
          padding: `${defaultTheme.spacing(1)} ${defaultTheme.spacing(1)}`,
          "&:hover": {
            color: defaultTheme.palette.tertiary.main,
            backgroundColor: "transparent",
            "& .MuiSvgIcon-root": {
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
          "&:hover": {
            color: defaultTheme.palette.primary.main,
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTabs: {
      indicator: {
        //backgroundColor: orange[700]
      },
    },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: 'Open Sans',
    //       fontSize: `${clientSpacing[2]} !important`,
    //       fontWeight: 400,
    //       lineHeight: 1.5,
    //       textTransform: 'uppercase',
    //       letterSpacing: 0.3,
    //     },
    //   },
    // },
    MuiTypography: {
      styleOverrides: {
        root: {},
        h2: {
          [defaultTheme.breakpoints.up("xs")]: {
            paddingTop: `${defaultTheme.spacing(6)} !important`,
            paddingBottom: `${defaultTheme.spacing(6)} !important`,
            marginTop: 0,
            marginBottom: 0,
          },
          [defaultTheme.breakpoints.up("md")]: {
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
          marginTop: defaultTheme.spacing(1),
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        notchedOutline: {
          border: `1px solid ${defaultTheme.palette.tertiary.main}`,
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        colorPrimary: {
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
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
  },
})

clientTheme = responsiveFontSizes(clientTheme)

export default clientTheme
