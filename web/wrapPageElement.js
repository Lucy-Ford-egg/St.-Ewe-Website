import React from "react"
import SanityPreviewConnectorProvider from "./src/components/preview/sanityPreviewConnector"
import { PreviewProvider } from "./src/context/previewContext"
import { Layout } from "./src/components/layout"
import { ThemeProvider } from '@mui/material/styles';
import clientTheme from "./src/gatsby-theme-material-ui-top-layout/theme"
import { CssBaseline } from '@mui/material';
import { PrivacyMessage } from '../web/src/components/privacyMessage'
import { HeadScripts } from './src/components/headScripts'

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => {
  console.log("process.env.SANITY_TOKEN",process.env.SANITY_TOKEN)

  return (
    <SanityPreviewConnectorProvider token={process.env.SANITY_TOKEN}>
  <ThemeProvider theme={clientTheme}>
    <CssBaseline />
    <HeadScripts {...props} />
    <Layout {...props}>
      <PreviewProvider>
        {element} 
      </PreviewProvider></Layout>
    <PrivacyMessage />
  </ThemeProvider>
  </SanityPreviewConnectorProvider>
)
}

export default wrapPageElement