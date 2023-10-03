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

  return (
   
  <ThemeProvider theme={clientTheme}>
    <CssBaseline />
    <HeadScripts {...props} />
    <Layout {...props}>
    <SanityPreviewConnectorProvider token={process.env.SANITY_TOKEN}>
      <PreviewProvider>
        {element} 
      </PreviewProvider>
      </SanityPreviewConnectorProvider>
      </Layout>
    <PrivacyMessage />
  </ThemeProvider>
 
)
}

export default wrapPageElement