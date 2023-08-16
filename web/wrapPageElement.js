import React from "react"
import {Script} from "gatsby"
import { Layout } from "./src/components/layout"
import { ThemeProvider } from '@mui/material/styles';
import clientTheme from "./src/gatsby-theme-material-ui-top-layout/theme"
import { CssBaseline } from '@mui/material';

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <ThemeProvider theme={clientTheme}>
    <CssBaseline />
    <Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
  strategy="off-main-thread"
/>
<Script id="gtag-config" strategy="off-main-thread" forward={[`gtag`]}>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', ${process.env.GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
  `}
</Script>
    <Layout {...props}>{element}</Layout>
  </ThemeProvider>
)

export default wrapPageElement
