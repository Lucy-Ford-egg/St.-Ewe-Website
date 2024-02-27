import React from "react"
import { graphql } from "gatsby"
import {Link} from 'gatsby-theme-material-ui'
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import { RenderPortableText } from "../components/renderPortableText"


export const ContactSection = props => {
  const theme = useTheme()
  const {
    _rawTitle,
    _rawText,
    previewData,
    sanityConfig,
    topPadding,
    formTerms,
  } = props

  const textColour = theme.palette.text.main

  const definedTopPadding = (previewData && previewData.topPadding) || topPadding
  const definedTitle = (previewData && previewData.title) || _rawTitle
  const definedText = (previewData && previewData.text) || _rawText
  const definedFormTerms = (previewData && previewData.formTerms) || formTerms

  // Forms
  const label = { inputProps: { 'aria-label': 'Checkbox demo'  } };
  //
  return (
    <Container
      maxWidth={false}
      sx={{
        pt: definedTopPadding
          ? 0
          : {
              xs: theme.spacing(10),
              md: theme.spacing(14),
            },
        pb: {
          xs: theme.spacing(0),
          md: theme.spacing(14),
        },
        backgroundColor: "primary.lighter"
      }}
    >
        <Grid
          container
          rowSpacing={{ xs: 6, sm: 6, md: 6 }}
          columnSpacing={{ xs: 13, sm: 13, md: 13 }}
          sx={{
            
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box>

            {definedTitle && (
              <RenderPortableText
                previewData={definedTitle}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedTitle}
              />
            )}
              {definedText && (
              <RenderPortableText
                previewData={definedText}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedText}
              />
            )}
  
            </Box>
    
              <Box>
                <form
                  method="POST"
                  name="contact-mui"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="contact-mui" />
                  <TextField
                    label="Name"
                    name="name"
                    required
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    required
                    fullWidth
                    type="email"
                    margin="normal"
                  />
                  <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                  />
                  <FormControlLabel required control={
                    <Checkbox {...label} size="small" icon={<CheckBoxOutlineBlankSharpIcon />}
                    checkedIcon={<CheckBoxSharpIcon  />} />} label="I accept the Terms" />
                    
                  {definedFormTerms && <Link to={definedFormTerms.link.internal.slug.current} target="_blank" rel="noopener"><Typography variant='caption'>{definedFormTerms.text}</Typography></Link>}
                  
                  <Button sx={{my: 6}} type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>
              </Box>
       
          </Grid>
        </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment ContactSectionFragment on SanityContactSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawText(resolveReferences: { maxDepth: 10 })
    topPadding
    formTerms {
      link {
        internal {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            slug {
              current
            }
          }
        }
      }
      text
    }
  }
`
