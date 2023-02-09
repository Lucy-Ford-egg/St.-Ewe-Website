import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid } from "@mui/material"
import { PostTile } from "../components/postTile"
import { Filter } from "./filter"

export const PostsGrid = ({ posts, allPost }) => {

  const [filtersPosts, setFilterData] = useState(allPost)

  const updatePosts = useCallback(() => { 
    setFilterData(filtersPosts);
  },[filtersPosts, setFilterData],)

  useEffect(() => {
    updatePosts()
  }, [updatePosts]);

  return (
    <Container maxWidth="xl">
      
      <Filter type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/>

      <Container maxWidth="lg" sx={{ py: { xs: 9 } }}>
        {posts.length === 0 && (
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
        {Array.isArray(posts) && (
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
        )}
      </Container>
    </Container>
  )
}