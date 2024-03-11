import React, { useState, useCallback, useEffect } from "react"
import { Tabs, Tab, Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";


export const Filter = ({ type, allData, filterData, setFilterData }) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const [selectedFilters, setSelectedFilters] = useState(null)
  const [categoriesUsed, setCategoriesUsed] = useState(null)
  const [filterTabsValue, setFilterTabsValue] = useState(0)

  // const addToFilter = (taxonomy) => {
  //   setSelectedFilters(taxonomy)
  //   if(taxonomy === null) {
  //     setFilterData(allData)
  //   }
  //   else{
  //   const filtered = allData.filter(e => e.category.name === taxonomy);
  //   setFilterData(filtered)
  //   }
  // }

  const handleChange = (event, value) => {
    // setValue(taxonomy);
    setFilterTabsValue(value)
    const taxonomy = event.currentTarget.textContent
   
    setSelectedFilters(taxonomy)
    if (taxonomy === "All") {
      setFilterData(allData)
    } else {
      const filtered = allData.filter(e => e.category.name === taxonomy)
      setFilterData(filtered)
    }
  }

  const data = useStaticQuery(graphql`
    query CategoriesQuery {
      allSanityPost {
        nodes {
          category {
            name
          }
        }
      }
    }
  `)

  const filterBox = {
    hidden: {
      opacity: 0,
      height: 0,
      y: 50,
      display: "none",
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      display: "block",
    },
  }

  const sortCategories = useCallback(() => {
    const array = data.allSanityPost.nodes.map(tax => {
      if (tax.category.name && tax.category.name.length > 0) {
        return { name: tax.category.name }
      }
    })

    var flattenArray = [].concat.apply([], array)
    const unique = [
      ...new Map(flattenArray.map(item => [item["name"], item])).values(),
    ]
    return unique
  }, [type, data.allSanityPost])

  useEffect(() => {
    const array = sortCategories()
    setCategoriesUsed(array)
  }, [sortCategories])

  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: {xs: "column", md: "row"}, alignItems: {xs: "flex-start", md: "center"} }}>
      <Typography variant="h4" component="h6" sx={{mr: 4,}}>
        Filter Posts:
      </Typography>
      <Tabs
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
        {categoriesUsed &&
          categoriesUsed.map(node => {
            return (
              <Tab               
                key={node.name}
                label={node.name}
              />
            )
          })}
      </Tabs>
    </Box>
  )
}
