import React, { useState } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  IconButton,
} from "@mui/material"
import Input from '@mui/base/Input'
import { PlacesGrid } from "./placesGrid"
import { useStaticQuery, graphql } from "gatsby"
import { topThreeCategories } from "../utils/metaDataHelpers"
import CloseIcon from "@mui/icons-material/Close"

export const SearchOverlay = ({ showSearch, setShowSearch }) => {
  const data = useStaticQuery(graphql`
    query PlacesQuery {
      localSearchPlaces {
        index
        store
      }
      allSanityPlace {
        nodes {
          categories: placeCategories {
            name
          }
        }
      }
    }
  `)

  const index = data.localSearchPlaces.index
  const store = data.localSearchPlaces.store

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store)
debugger
  const handleChange = (value, setSubmitting) => {
    setQuery(value)
    //setSubmitting(false)
  }
  console.log("Results", results)

  const updateFromPopular = e => {
    handleChange(e.target.innerText)
  }

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        height: "100%",
        zIndex: 9,
        backgroundColor: "#F5F5F5",
        pt: { xs: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Container>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton
                aria-label="close"
                sx={{ height: "fit-content", pr: 0 }}
                onClick={e => setShowSearch(false)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ mt: 6, mb: 8 }}>
                <Input
                  id="searchInput"
                  value={query}
                  placeholder="Type Here"
                  onChange={e => handleChange(e.target.value)}
                />
              </Box>
              <Typography variant="h5">Most Popular</Typography>
              <List sx={{ mb: 6 }} dense="true">
                {topThreeCategories(data.allSanityPlace.nodes)
                  .slice(0, 3)
                  .map(node => {
                    return (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primaryTypographyProps={{
                            variant: "body1",
                            sx: {
                              "&:hover": {
                                cursor: "pointer",
                                fontWeight: "bold",
                              },
                            },
                          }}
                          primary={node}
                          onClick={e => updateFromPopular(e)}
                        />
                      </ListItem>
                    )
                  })}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container maxWidth="xl">
        <PlacesGrid showFilter={false} allPlace={results} searching={true} />
      </Container>
    </Box>
  )
}
