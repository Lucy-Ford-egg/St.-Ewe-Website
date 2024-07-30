import React from "react"
import Box from "@mui/material/Box"
import {Button} from "gatsby-theme-material-ui"
import Typography from "@mui/material/Typography"
import { graphql, useStaticQuery } from "gatsby"


export const Filter = ({ type, allData, setFilterData, pageContext }) => {
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
debugger
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        overflowX: "hidden",
      }}
    >
      <Typography variant="h4" component="h6" sx={{ mr: 4 }}>
        Filter Posts:
      </Typography>
      <Box
        sx={{
          overflowScrolling: "touch",
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Button variant="text" key="all" to={`/blog`}
        sx={{
          flex: "0 0 auto", 
          color: pageContext?.slug === "blog" ? "primary.main" : "tertiary.main"}}>
          All
        </Button>
        {data.allSanityCategories?.nodes &&
          data.allSanityCategories?.nodes.map(node => {
       
            return (
              <Button
                
                variant="text"
                key={node?.name}
                to={`/blog/category/${node?.slug?.current}/`}
                sx={{
                  flex: "0 0 auto",
                  color: pageContext?.slug === node?.slug?.current ? "primary.main" : "tertiary.main",
                  "&:hover": {
                    cursor: "pointer",
                    color: "primary.main"
                }
              }}
              >
                {node?.name}
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}
