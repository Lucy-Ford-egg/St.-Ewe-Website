import React from "react"
import SanityPreviewConnectorProvider from "./src/components/preview/sanityPreviewConnector"
import { PreviewProvider } from "./src/context/previewContext"
import { Layout } from "./src/components/layout"
import { ThemeProvider } from '@mui/material/styles';
import clientTheme from "./src/gatsby-theme-material-ui-top-layout/theme"
import { CssBaseline } from '@mui/material';
import { PrivacyMessage } from '../web/src/components/privacyMessage'
import { HeadScripts } from './src/components/headScripts'

// Preview
import { useQuery } from "./sanity/store";
import {PAGE_QUERY} from './src/queries/documentQueries';

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const WrapPageElement = ({ element, props, initial }) => {

    const definedSlug = props.data.sanityPage || props.data.sanityPost
    // Preview
    const { data: previewData, sourceMap } = useQuery(
      PAGE_QUERY,
      {slug: definedSlug.slug.current},
      { initial }
    );
  
  return (

    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <PreviewProvider>
        <SanityPreviewConnectorProvider token={process.env.SANITY_TOKEN}>
          <HeadScripts activePreview={props} />
          <Layout {...props} previewData={previewData}>
            {element}
          </Layout>
        </SanityPreviewConnectorProvider>
      </PreviewProvider>

      {/* <PrivacyMessage /> */}
    </ThemeProvider>

  )
}

export default WrapPageElement