import React, { useState } from "react"
import { LiaAngleDownSolid } from "react-icons/lia"
import { graphql } from "gatsby"
import {
  useTheme,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
} from "@mui/material"
import { RenderPortableText } from "./utils/renderPortableText"
import { LinkType } from "./utils/linkType"
import { ModuleContainer } from "./moduleContainer"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ theme, backgroundColour }) => ({
  // Base styles
  backgroundColor: backgroundColour?.value,
  //
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  overflow: "hidden",
  color: "var(--primary-navy)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const AccordionWrapper = styled(Accordion)(({ theme, backgroundColour }) => ({
  padding: "0 !important",
  gridColumn: "2/24",
  backgroundColor: "unset",
  py: "var(--ms0)",
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "2/24",
  },
  "&:before": {
    backgroundColor: contrastBrandPalette[backgroundColour?.label]?.contrastSvg,
  },
}))

const AccordSummary = styled(AccordionSummary)(
  ({ theme, backgroundColour }) => ({
    flexDirection: "column-reverse",
    alignItems: "start",
    columnGap: "var(--ms3)",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .MuiAccordionSummary-content": {
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      flexBasis: "100%",
    },
  }),
)

const Summary = styled("div")({
  display: "flex",
  flexDirection: "column",
  "& .title": {
    marginBottom: 0,
  },
})

const Details = styled(AccordionDetails)(({ theme, backgroundColour }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  paddingTop: 0,
  color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText} !important`,
  a: {
    textDecorationColor: "var(--rich-yolk-primary)",
  },
  "&>div": {
    gridColumn: "1/25",
    [theme.breakpoints.up("lg")]: {
      gridColumn: "2/24",
    },
  },
}))

export const AccordionSection = props => {
  const [expanded, setExpanded] = useState(false)
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const { _key, accordion, verticalSpace, backgroundColour } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper
        className={`vs${verticalSpace?.topPadding}-top vs${verticalSpace?.bottomPadding}-bottom`}
        backgroundColour={backgroundColour}
        verticalSpace={verticalSpace}
      >
        {accordion?.map((item, i) => {
          return (
            <AccordionWrapper
              key={`${_key}-${item?.title}-${i}`}
              square={true}
              disableGutters={true}
              elevation={0}
              expanded={expanded === `${_key}-panel${i}`}
              onChange={handleChange(`${_key}-panel${i}`)}
              backgroundColour={backgroundColour}
            >
              <AccordSummary
                aria-controls={`${_key}-panel${i}-content`}
                id={`${_key}-panel${i}-header`}
                expandIcon={
                  <LiaAngleDownSolid
                    style={{
                      color:
                        contrastBrandPalette[backgroundColour?.label]
                          ?.contrastSvg,
                    }}
                  />
                }
                sx={{}}
              >
                <Summary>
                  <Typography
                    variant="h3"
                    component="h4"
                    className="title"
                    style={{
                      color:
                        contrastBrandPalette[backgroundColour?.label]
                          ?.contrastText,
                    }}
                  >
                    {item?.title || item?.question}
                  </Typography>
                  <span
                    className="body--medium "
                    style={{
                      color:
                        contrastBrandPalette[backgroundColour?.label]
                          ?.contrastText,
                    }}
                  >
                    {item?.subtitle}
                  </span>
                </Summary>
                {item?.link && (
                  <LinkType
                    className={`button outlined outlined--primary button--primary`}
                    variant="outlined"
                    color={
                      contrastBrandPalette[backgroundColour?.label]
                        ?.contrastButtonColour
                    }
                    node={item?.link?.link}
                  >
                    {item?.link?.text}
                  </LinkType>
                )}
              </AccordSummary>

              <Details backgroundColour={backgroundColour}>
                <RenderPortableText variant={false} value={item?.answer} />
              </Details>
            </AccordionWrapper>
          )
        })}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment AccordionSectionFragment on SanityAccordionSection {
    _key
    _type
    accordion {
      ... on SanityCareers {
        id
        title
        subtitle
        link {
          ...LinkLabelFragment
        }
        answer: _rawAnswer(resolveReferences: { maxDepth: 10 })
        _key
        _id
      }
      ... on SanityFaqs {
        id
        answer: _rawAnswer(resolveReferences: { maxDepth: 10 })
        question
        link {
          ...LinkLabelFragment
        }
      }
    }
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }
  }
`
