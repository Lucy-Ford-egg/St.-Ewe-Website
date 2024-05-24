import React, { useState } from "react"
import { graphql } from "gatsby"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Accordion from "@mui/material/Accordion"

import { RenderPortableText } from "./renderPortableText"
import { CiCircleChevDown } from "react-icons/ci"
import { contrastColour } from "../utils/contrastColour"

export const AccordionTile = props => {
  const [expanded, setExpanded] = useState("panel0")

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  const { tileColor, tile, previewData, index } = props

  const definedTitle =
    (previewData && previewData?.steps[index]?.title) || tile?.title
  const definedText =
    (previewData && previewData?.steps[index]?.text) || tile?._rawText
  const definedKey =
    (previewData && previewData?.steps[index]?._key) || tile?._key

  return (
    <Paper
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        width: "100%",
        height: "100%",
        mb: 0,
        borderRadius: 0,
      }}
    >
      <Accordion
        square={true}
        disableGutters={true}
        elevation={0}
        key={definedKey}
        expanded={expanded === `panel${definedKey}`}
        onChange={handleChange(`panel${definedKey}`)}
        sx={{ backgroundColor: "unset" }}
      >
        <AccordionSummary
          aria-controls={`panel${definedKey}-content`}
          id={`panel${definedKey}-header`}
          expandIcon={
            <CiCircleChevDown
              style={{ fontSize: 24 }}
              color={contrastColour(tileColor).divider.hex}
            />
          }
          sx={{ backgroundColor: tileColor.value }}
        >
          {definedTitle && (
            <Typography
              variant="overline"
              color={contrastColour(tileColor).textColour}
            >
              {definedTitle}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white.main" }}>
          {definedText && (
            <RenderPortableText
              previewData={definedText}
              //sanityConfig={sanityConfig}
              setAsHeading={false}
              value={definedText}
              color={contrastColour(tileColor).textColour}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export const query = graphql`
  fragment FaqsSectionFragment on SanityFaqsSection {
    _key
    _type
    _rawText(resolveReferences: { maxDepth: 10 })
    title
  }
`
