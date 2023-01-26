import React, {useState} from "react"
import {Container, Box, Button, IconButton} from "@mui/material"
import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';


export const Filter = ({allPlace, filterPlaces, setFilterPlaces}) => {

  const [open, setOpen] = useState("hidden");


  const doFilterPlaces = (taxonomy, e) => {
    const results = e.categories.some(function(o){return o.name === taxonomy})
    return results
  }

  const addToFilter = (taxonomy) => {
   
    const filtered = allPlace.filter(e => doFilterPlaces(taxonomy, e));
    console.log('filterd', filtered)
    setFilterPlaces([...filtered])
  }

  const handleClick = (filter) => {
    setOpen(filter);
  };

  const data = useStaticQuery(graphql`
  query CategoriesQuery {
    allSanityCategories {
      nodes {
        name
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

  return(
    <Container maxWidth="lg" sx={{mt: 9}}>

        <motion.div variants={filterBox} initial="hidden" animate={open}>
          <Box sx={{p: {xs: 9}, backgroundColor: "primary.main"}} display="flex">

            <Box display="flex" flexWrap="wrap" justifyContent="space-between" sx={{columnGap: 3, rowGap: 3, flexGrow: 1}}> 
              {data.allSanityCategories.nodes.map((taxonomy, i) => {
                return(
                  <Button key={taxonomy.name} onClick={e => addToFilter(taxonomy.name) }variant="contained" disableElevation sx={{borderRadius: 0, color:"white", backgroundColor: "primary.mid" }}>{taxonomy.name}</Button>
                )
              })}
            </Box>

            <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{flexGrow: 1}}>
              <IconButton aria-label="close filter" color="white" onClick={e => handleClick("hidden")}>
                <CloseIcon />
              </IconButton>
            </Box>

          </Box> 
        </motion.div>

      {open === 'hidden' && <Box display="flex" justifyContent="center">
        <Button onClick={e => handleClick("visible")} variant="contained" startIcon={<AppsIcon />} sx={{ display: 'flex'}}>Filter</Button>
      </Box>}

    </Container>
  )
}