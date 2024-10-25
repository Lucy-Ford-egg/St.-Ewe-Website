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

import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({
    theme,
    verticalSpace,
    borderDirection,
    backgroundColour,
    joiningColour,
    mirror,
  }) => ({
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
  }),
)

const AccordionWrapper = styled(Accordion)(
  ({
    theme,
    verticalSpace,
    borderDirection,
    backgroundColour,
    joiningColour,
    mirror,
  }) => ({
    padding: "0 !important",
    gridColumn: "1/25",
    [theme.breakpoints.up("sm")]: {
      gridColumn: "1/25",
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: "2/24",
    },
  }),
)

const Summary = styled("div")(
  ({
    theme,
    verticalSpace,
    borderDirection,
    backgroundColour,
    joiningColour,
    mirror,
  }) => ({
    display: "flex",
    flexDirection: "column",
    "& .title": {
      marginBottom: 0,
    },
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const Details = styled(AccordionDetails)(
  ({
    theme,
    verticalSpace,
    borderDirection,
    backgroundColour,
    joiningColour,
    mirror,
  }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(24, 1fr)",
    paddingTop: 0,
    "&>div": {
      gridColumn: "2/24",
    },

    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

export const AccordionSection = props => {
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()
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
              key={`${_key}-${item?.title}`}
              square={true}
              disableGutters={true}
              elevation={0}
              expanded={expanded === `${_key}-panel${i}`}
              onChange={handleChange(`${_key}-panel${i}`)}
              sx={{ backgroundColor: "unset", py: 1 }}
            >
              <AccordionSummary
                aria-controls={`${_key}-panel${i}-content`}
                id={`${_key}-panel${i}-header`}
                expandIcon={
                  <LiaAngleDownSolid
                    style={{
                      color: "var(--primary-navy)",
                    }}
                  />
                }
                sx={{
                  flexDirection: "column-reverse",
                  alignItems: "start",
                  [theme.breakpoints.up("md")]: {
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  columnGap: "var(--ms3)",
                  "& .MuiAccordionSummary-content": {
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    flexBasis: "100%",
                  },
                }}
              >
                <Summary>
                  <Typography
                    variant="h3"
                    component="h4"
                    className="title"
                    style={{
                      color: "var(--secondary-red)",
                    }}
                  >
                    {item?.title || item?.question}
                  </Typography>
                  <span
                    className="body--medium "
                    style={{ color: "var(--primary-red)" }}
                  >
                    {item?.subtitle}
                  </span>
                </Summary>
                {item?.link && (
                  <LinkType
                    className={`button outlined outlined--primary button--primary`}
                    link={item?.link}
                  />
                )}
              </AccordionSummary>

              <Details
                sx={{
                  a: {
                    //color: "background.main",
                    textDecorationColor: theme.palette.background.main,
                  },
                }}
              >
                <RenderPortableText
                  color="background.main"
                  variant={false}
                  value={item?._rawAnswer}
                />
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
          external
        }
        _rawAnswer(resolveReferences: { maxDepth: 10 })
        _key
        _id
      }
      ... on SanityFaqs {
        id
        _rawAnswer(resolveReferences: { maxDepth: 10 })
        question
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
