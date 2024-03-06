import React, {useState, useCallback, useEffect} from "react"
import {Container, Box, Button, IconButton, Typography} from "@mui/material"
import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"


export const Filter = ({type, allData, filterPlaces, setFilterData}) => {
  
  const [selectedFilters, setSelectedFilters] = useState(null)
  const [categoriesUsed, setCategoriesUsed] = useState(null)


  const addToFilter = (taxonomy) => {
    setSelectedFilters(taxonomy)
    if(taxonomy === null) {
      setFilterData(allData)
    }
    else{
    const filtered = allData.filter(e => e.category.name === taxonomy);
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
      display: 'none'
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      display: 'block'
    }
  }

  const sortCategories = useCallback(
    () => {

        const array = data.allSanityPost.nodes.map((tax) => {
          if(tax.category.name && tax.category.name.length > 0){
            return (
              {name: tax.category.name}
            )
          }
        })
     
        var flattenArray = [].concat.apply([], array);
        const unique = [...new Map(flattenArray.map(item => [item['name'], item])).values()]
        return unique
      
    },[type, data.allSanityPost]
  )
  
  useEffect(() => {
    const array = sortCategories()
    setCategoriesUsed(array)

  }, [sortCategories])
  
  

  return(
    <Container className="component-filter" maxWidth="xl" sx={{py: 8}}>

        
          <Box sx={{flexDirection: {xs: 'column', md: 'row'}, backgroundColor: "background.default"}} display="flex">

            <Box display="flex" flexWrap="wrap" sx={{justifyContent: {xs: 'space-around', md: 'flex-start'}, columnGap: 3, rowGap: 3, flexGrow: 1, order: {xs: 2, md: 1}}}> 
            <Typography variant="h4" component="h6">Filter Posts</Typography>
              
                 
                 <Button key={`all`} onClick={e => addToFilter(null)} variant="text" disableElevation sx={{borderRadius: 0, }}>All</Button>

                 {categoriesUsed && categoriesUsed.map((node) => {
                  return(
                    <Button key={node.name} onClick={e => addToFilter(node.name)} variant="text" disableElevation sx={{borderRadius: 0, }}>{node.name}</Button>
                  )
                })}
            
            </Box>

          </Box> 
       
    </Container>
  )
}