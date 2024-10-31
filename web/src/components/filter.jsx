import React from "react"
import { Button } from "gatsby-theme-material-ui"
import Typography from "@mui/material/Typography"
import { graphql, useStaticQuery } from "gatsby"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ props, theme }) => ({
  paddingBottom: "var(--ms4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflowX: "hidden",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}))

const ScrollFilter = styled("div")(({ props, theme }) => ({
  overflowScrolling: "touch",
  display: "flex",
  flexWrap: "nowrap",
  overflowX: "auto",
  width: "100%",
  "&::-webkit-scrollbar": {
    width: "var(--ms-4)",
  },
  [theme.breakpoints.up("lg")]: {},
}))

export const Filter = ({ pageContext, backgroundColour }) => {
  const data = useStaticQuery(graphql`
    query CategoriesQuery {
      allSanityCategories {
        nodes {
          slug {
            current
          }
          name
        }
      }
    }
  `)

  return (
    <Wrapper>
      <Typography
        variant="h4"
        component="h6"
        color={contrastBrandPalette[backgroundColour?.label]?.contrastText}
        sx={{ mr: 4 }}
      >
        Filter Posts:
      </Typography>
      <ScrollFilter>
        <Button
          variant="text"
          key="all"
          to={`/news`}
          sx={{
            flex: "0 0 auto",
            color:
              pageContext?.slug === "news"
                ? "primary.main"
                : contrastBrandPalette[backgroundColour?.label]?.contrastText,
          }}
        >
          All
        </Button>
        {data.allSanityCategories?.nodes &&
          data.allSanityCategories?.nodes.map(node => {
            return (
              <Button
                variant="text"
                key={node?.name}
                to={`/news/category/${node?.slug?.current}/`}
                sx={{
                  flex: "0 0 auto",
                  color:
                    pageContext?.slug === node?.slug?.current
                      ? "primary.main"
                      : contrastBrandPalette[backgroundColour?.label]
                          ?.contrastText,
                  "&:hover": {
                    cursor: "pointer",
                    color: "primary.main",
                  },
                }}
              >
                {node?.name}
              </Button>
            )
          })}
      </ScrollFilter>
    </Wrapper>
  )
}
