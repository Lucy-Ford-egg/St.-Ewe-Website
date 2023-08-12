import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid } from "@mui/material"
import { Pagination } from "../components/pagination"
import { PostTile } from "../components/postTile"
import { Filter } from "./filter"


export const PostsGrid = ({ posts, allPost, searching = false, pageContext }) => {
  
const [filtersPosts, setFilterData] = useState(null)

  const updatePosts = useCallback(() => { 
    const thePlaces = allPost ? allPost : filtersPosts
    setFilterData(thePlaces);
  },[filtersPosts, setFilterData],)

  useEffect(() => {
    updatePosts()
  }, [updatePosts]);


  return (
    <Container className="component-postsGrid" maxWidth="xl">
      
      <Filter className="component-filter" type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/>

      <Container maxWidth="lg" sx={{ pt: { xs: 9 } }}>
        {filtersPosts && searching === false && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {filtersPosts?.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <PostTile
                    title={tile.title}
                    image={tile.coverImage.asset.gatsbyImageData}
                    category={tile.categories}
                    date={tile.date}
                    to={tile.slug.current}
                    excerpt={tile.excerpt}
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
        {/* {Array.isArray(posts) && searching === true && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {posts.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <PostTile
                    title={tile.title}
                    image={tile.coverImage.asset.gatsbyImageData}
                    categories={tile.categories}
                    date={tile.date}
                    to={tile.slug.current}
                    excerpt={tile.excerpt}
                  />
                </Grid>
              )
            })}
          </Grid>
        )} */}
      </Container>
      <Pagination pageContext={pageContext}/>
    </Container>
  )
}