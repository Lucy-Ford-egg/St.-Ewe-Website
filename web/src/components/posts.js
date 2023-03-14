import React from "react"
import { graphql } from "gatsby"
import { Container } from "@mui/material"
import {PostsGrid} from "../components/postsGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Posts = ({ gridTitleSubtitleText, posts, allPost}) => {
  
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 9 } }}>

      <TitleSubtitleText displayTitle={gridTitleSubtitleText?.displayTitle} subtitle={gridTitleSubtitleText?.subtitle} text={gridTitleSubtitleText?.text} titleSize={gridTitleSubtitleText?.titleSize} subtitlePosition={gridTitleSubtitleText?.subtitlePosition} titleWidth={gridTitleSubtitleText?.titleWidth}/>

      <PostsGrid allPost={allPost} posts={posts}/>

    </Container>
  )
}

export const query = graphql`
  fragment PostsGridFragment on SanityPostsGrid {
    ...PostFragment
    gridTitleSubtitleText {
      ...TitleSubtitleTextFragment
    }
  }
`
