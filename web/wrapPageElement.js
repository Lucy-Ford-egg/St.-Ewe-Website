import React, { useState } from "react"

import { Layout } from "./src/components/layout"
import { ThemeProvider } from '@mui/material/styles';
import clientTheme from "./src/gatsby-theme-material-ui-top-layout/theme"
import { CssBaseline } from '@mui/material';
import {PrivacyMessage} from '../web/src/components/privacyMessage'
import {HeadScripts} from './src/components/headScripts'

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <ThemeProvider theme={clientTheme}>
    <CssBaseline />
    <HeadScripts {...props}/>
    <Layout {...props}>{element}</Layout>
    <PrivacyMessage />
  </ThemeProvider>
)

export default wrapPageElement
