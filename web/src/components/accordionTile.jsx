import React, { useState } from "react"
import { graphql } from "gatsby"
import {
  Typography,
  Paper,
  useTheme,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material"
// // import { Icons } from "../components/icons"
import { textAlignToJustifyContent } from "../utils/alignment"
import { RenderPortableText } from "./renderPortableText"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ButtonFormat } from "./buttonFormat"


export const AccordionTile = props => {
  const [expanded, setExpanded] = useState("panel0")

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const theme = useTheme()
  const {
    title,
    _rawText,
    index,
    tileColor,
    _key,
    tile,
    previewData,
  } = props


  const definedTitle = (previewData && previewData?.tile?.title) || tile?.tile
  const definedText = (previewData && previewData?.tile?._rawText) || tile?._rawText

  return (
    <Paper 
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tileColor.value,
        flexBasis: "100%",
        height: "100%",
        mb: 6,
        borderRadius: 0,
      }}
    >
            
                <Accordion
                  square={true}
                  disableGutters={true}
                  elevation={0}
                  key={_key}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{backgroundColor: 'unset'}}
                >
                  <AccordionSummary
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    expandIcon={<KeyboardArrowDownIcon color='secondary'/>}
                  >
                    {definedTitle && <Typography color='secondary.main' variant='h5'>{definedTitle}</Typography>}
                  </AccordionSummary>
                  <AccordionDetails>
                    {definedText && 
                    <RenderPortableText color='secondary.main' variant={false} value={definedText}/>}
                  </AccordionDetails>
                </Accordion>
             
      
        </Paper>
  )
}

export const query = graphql`
  fragment FaqsSectionFragment on SanityFaqsSection {
    _key
    _type
    _rawText(resolveReferences: {maxDepth: 10})
    title
  }
`
