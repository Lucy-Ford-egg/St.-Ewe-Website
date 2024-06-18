import React, { useState, useCallback, useEffect } from "react"
// import Tabs from "@mui/material/Tabs"
// import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import {Button} from "gatsby-theme-material-ui"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { CiCircleChevLeft } from "react-icons/ci";


export const Filter = ({ type, allData, setFilterData }) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  // const [selectedFilters, setSelectedFilters] = useState(null)
  // const [categoriesUsed, setCategoriesUsed] = useState(null)
  // const [filterTabsValue, setFilterTabsValue] = useState(0)


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

  // const sortCategories = useCallback(() => {
  //   const array = data.allSanityPost?.nodes.map(tax => {
  //     if (tax?.category?.name && tax?.category?.name?.length > 0) {
  //       return { name: tax?.category?.name, slug:tax?.category?.slug?.current  }
  //     }
  //   })

  //   var flattenArray = [].concat.apply([], array)
  //   const unique = [
  //     ...new Map(flattenArray.map(item => [item["name"], item])).values(),
  //   ]
  //   return unique
  // }, [ data.allSanityPost])

  // useEffect(() => {
  //   const array = sortCategories()
  //   setCategoriesUsed(array)
  // }, [sortCategories])

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
        sx={{flex: "0 0 auto"}}>
          All
        </Button>
        {data.allSanityCategories?.nodes &&
          data.allSanityCategories?.nodes.map(node => {
            return (
              <Button
                color="tertiary"
                variant="text"
                key={node?.name}
                to={`/blog/category/${node?.slug?.current}/`}
                sx={{flex: "0 0 auto"}}
              >
                {node?.name}
              </Button>
            )
          })}
      </Box>
      {/* <Tabs
        value={filterTabsValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={mobile ? true : false}
        allowScrollButtonsMobile
        aria-label="Categories"
        ScrollButtonComponent={CiCircleChevLeft}
        sx={{
          maxWidth: "100%",
          alignItems: "center",
          "& .MuiTabs-scroller":{
            display: "inline-flex",
          },
          "& .MuiTabs-indicator":{
            height: "1px",
            display: "none",
          },
          "& .MuiTabScrollButton-horizontal":{
            width: 24,
          },
          "& .MuiTabs-scrollButtons":{
            width: {xs: 60, sm: 30, md: 24},
            height: {xs: 60, sm: 30, md: 24},
            "&:last-of-type":{
              transform: "rotate(180deg)",
            }
          },
          [`& .MuiButtonBase-root`]: {
            fontSize: `12px !important`,
            minWidth: "min-content",
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab        
          label="All"
          color={selectedFilters === null ? "primary" : "tertiary"}
        />
        {data.allSanityPost?.nodes &&
          data.allSanityPost?.nodes.map(node => {
            return (
               <Tab        
                label={node?.category?.name}>
                <Link key={node?.category?.name} to={`/blog/category/${node?.category?.slug?.current}/`}>{node?.category.name}</Link>
              </Tab>
            )
          })}
      </Tabs> */}
    </Box>
  )
}
