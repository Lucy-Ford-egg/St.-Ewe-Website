import React, {useState, useCallback, useEffect} from "react"
import {Container, Box, Button, IconButton} from "@mui/material"
import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';


export const Filter = ({type, allData, filterPlaces, setFilterData}) => {

  const [open, setOpen] = useState("hidden");
  const [selectedFilters, setSelectedFilters] = useState(null)
  const [categoriesUsed, setCategoriesUsed] = useState(null)

  const doFilterPlaces = (taxonomy, e) => {
    const results = e.categories.some(function(o){return o.name === taxonomy})
    return results
  }

  const addToFilter = (taxonomy) => {

    setSelectedFilters(taxonomy)
    
    const filtered = allData.filter(e => doFilterPlaces(taxonomy, e));
    console.log('filterd', filtered)
    setFilterData([...filtered])
  }

  const handleClick = (filter) => {
    setOpen(filter);
  };

  const data = useStaticQuery(graphql`
  query CategoriesQuery {
    allSanityPost {
      nodes {
        categories {
          name
        }
      }
    }
    allSanityPlace {
      nodes {
        categories {
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

      const dataSet = type === 'posts' ? data.allSanityPost.nodes : data.allSanityPlace.nodes
        const array = dataSet.map((taxonomy, i) => {
          return (taxonomy.categories.filter(tax => tax.name && tax.name.length > 0))    
        })
        var flattenArray = [].concat.apply([], array);
        const unique = [...new Map(flattenArray.map(item => [item['name'], item])).values()]
        return unique
      
    },[type, data.allSanityPlace, data.allSanityPost]
  )
  
  

  useEffect(() => {
    const array = sortCategories()
    setCategoriesUsed(array)

  }, [sortCategories])
  
  

  return(
    <Container className="component-filter" maxWidth="lg">

        <motion.div variants={filterBox} initial="hidden" animate={open}>
          <Box sx={{flexDirection: {xs: 'column', md: 'row'}, p: {xs: 4, md: 9}, backgroundColor: "primary.main"}} display="flex">

            <Box display="flex" flexWrap="wrap" sx={{justifyContent: {xs: 'space-around', md: 'space-between'}, columnGap: 3, rowGap: 3, flexGrow: 1, order: {xs: 2, md: 1}}}> 
              {
                 
              
                 categoriesUsed && categoriesUsed.map((node) => {
                  return(
                    <Button key={node.name} onClick={e => addToFilter(node.name)} variant="contained" disableElevation sx={{borderRadius: 0, color:"white", backgroundColor: selectedFilters === node.name ? "primary.dark" : "primary.mid" }}>{node.name}</Button>
                  )
                })
            }
            </Box>

            <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{flexGrow: 1, order: {xs: 1, md: 2}}}>
              <IconButton aria-label="close filter" color="white" onClick={e => handleClick("hidden")}>
                <CloseIcon />
              </IconButton>
            </Box>

          </Box> 
        </motion.div>

      {open === 'hidden' && <Box display="flex" justifyContent="center">
        <Button onClick={e => handleClick("visible")} variant="contained" startIcon={<AppsIcon />} sx={{ display: 'flex', mx: 1}}>Filter</Button>
        <Button onClick={e => setFilterData([...allData])} variant="text" sx={{ mx: 1}}>Reset</Button>
      </Box>}

    </Container>
  )
}