import React, { useState } from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material"
import { Icons } from "../components/icons"
import { textAlignToJustifyContent } from "../utils/alignment"
import { RenderPortableText } from "./renderPortableText"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ButtonFormat } from "./buttonFormat"


export const FaqsSection = props => {
  const [expanded, setExpanded] = useState("panel0")

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const theme = useTheme()
  const {
    title,
    _rawRichText,
    faqs,
    links,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    icon,
    subtitle,
    textAlign,
  } = props

  return (
    <Container
      maxWidth="false"
      sx={{
        pb: { xs: theme.spacing(13), md: theme.spacing(15) },
        pt: topPadding ? 0 : { xs: theme.spacing(13), md: theme.spacing(15) },
        backgroundColor: theme.palette.highlight.main,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          rowSpacing={{xs: 12, md: 12}}
          columnSpacing={{ xs: 13, sm: 13, md: 13 }}
          direction={mirror ? "row-reverse" : "row"}
          sx={{
            px: { xs: 0 },
            justifyContent: textAlignToJustifyContent(textAlign),
          }}
        >
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              {icon && (
                <Icons
                  type={
                    previewData && previewData.icon ? previewData.icon : icon
                  }
                />
              )}

              {subtitle && (
                <Typography
                  color="secondary.main"
                  sx={{ mt: { xs: 4, md: 4 } }}
                  variant="overline"
                  component="p"
                >
                  {previewData && previewData.subtitle
                    ? previewData.subtitle
                    : subtitle}
                </Typography>
              )}

              {title && (
                <Typography color="secondary.main" variant="h2">
                  {previewData && previewData.title ? previewData.title : title}
                </Typography>
              )}
              {_rawRichText && (
                <Divider
                  component="div"
                  role="presentation"
                  sx={{
                    borderColor: theme.palette.secondary.main,
                    maxWidth: 305,
                  }}
                />
              )}
              {_rawRichText && (
                <Box sx={{ py: { xs: 6, md: 10 } }}>
                <RenderPortableText color='secondary.main' variant={false} value={previewData && previewData._rawRichText ? previewData._rawRichText : _rawRichText}/>
                </Box>
              )}
              <Box
             sx={{
               width: "fit-content",
               display: "flex",
               justifyContent: "flex-end",
               flexDirection: "row",
               flexBasis: "100%",
               columnGap: 6,
             }}
           >
             {links &&
               links.map((node, i) => {
                 return (
                   <ButtonFormat
                     variant={i === 0 ? "contained" : "outlined"}
                     color={i === 0 ? "primary" : "tertiary"}
                     node={
                       previewData && previewData.node
                         ? previewData.node
                         : node
                     }
                     sx={{}}
                   />
                 )
               })}
           </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              flexGrow: "auto",
              "&:first-of-type": {
                pt: { xs: 0, md: theme.spacing(6) },
              },
            }}
          >
            {faqs.map((faq, i) => {
              
              return (
                <Accordion
                  square={true}
                  disableGutters={true}
                  elevation={0}
                  key={faq.question}
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                  sx={{backgroundColor: 'unset'}}
                >
                  <AccordionSummary
                    aria-controls={`panel${i}-content`}
                    id={`panel${i}-header`}
                    expandIcon={<KeyboardArrowDownIcon color='secondary'/>}
                  >
                    <Typography color='secondary.main' variant='h5'>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RenderPortableText color='secondary.main' variant={false} value={faq._rawAnswer}/>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment FaqsSectionFragment on SanityFaqsSection {
    _key
    _type
    faqs {
      _rawAnswer
      question
    }
    mirror
    icon
    subtitle
    title
    links {
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
        external
      }
      text
    }
    _rawRichText
    topPadding
  }
`
