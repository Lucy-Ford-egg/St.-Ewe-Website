import React, { useState } from "react"
import { Button } from "gatsby-theme-material-ui"
import Typography from "@mui/material/Typography"
import { graphql, useStaticQuery } from "gatsby"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ props, theme }) => ({
  paddingBottom: "var(--ms0)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  overflowX: "hidden",
  justifyContent: "space-between",
  [theme.breakpoints.up("lg")]: {
    paddingBottom: "var(--ms4)",
  },
}))

const ScrollFilter = styled("div")(({ props, theme }) => ({
  overflowScrolling: "touch",
  display: "flex",
  flexWrap: "nowrap",
  overflowX: "auto",

  "&::-webkit-scrollbar": {
    width: "var(--ms-4)",
  },
  [theme.breakpoints.up("lg")]: {},
}))

const FilterButton = styled(Button)(({ props, theme }) => ({
  fontFamily: "Roboto Serif",
  fontSize: 12,
  letterSpaceing: 1.2,
  [theme.breakpoints.up("lg")]: {},
}))

export const Filter = ({ type, pageContext, backgroundColour }) => {
  const [whichFilter, setWhichFilter] = useState("all")

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
      allSanityRecipesCategory {
        nodes {
          slug {
            current
          }
          name
        }
      }
    }
  `)

  const cats =
    type === "recipes"
      ? data?.allSanityRecipesCategory
      : data.allSanityCategories
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
        <FilterButton
          variant="text"
          key="all"
          to={`/${type}`}
          sx={{
            flex: "0 0 auto",
            minWidth: "fit-content",
            color:
              pageContext?.slug === "news" || pageContext?.slug === "recipies"
                ? "primary.main"
                : contrastBrandPalette[backgroundColour?.label]?.contrastText,
          }}
        >
          All
        </FilterButton>
        {cats?.nodes &&
          cats?.nodes.map(node => {
            return (
              <FilterButton
                variant="text"
                key={node?.name}
                to={`/${type}/category/${node?.slug?.current}/`}
                onClick={() => setWhichFilter(node?.slug?.current)}
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
              </FilterButton>
            )
          })}
      </ScrollFilter>
    </Wrapper>
  )
}
