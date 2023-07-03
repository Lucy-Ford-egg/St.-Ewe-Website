import React from "react"
import { graphql } from "gatsby"
import { Container } from "@mui/material"
import {PostsGrid} from "../components/postsGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Posts = ({ gridTitleSubtitleText, posts, allPost, pageContext}) => {
  
  return (
    <Container className="section posts" maxWidth="xl" sx={{ pt: { xs: 10, md: 11 }}}>

      <TitleSubtitleText displayTitle={gridTitleSubtitleText?.displayTitle} subtitle={gridTitleSubtitleText?.subtitle} text={gridTitleSubtitleText?.text} titleSize={gridTitleSubtitleText?.titleSize} subtitlePosition={gridTitleSubtitleText?.subtitlePosition} titleWidth={gridTitleSubtitleText?.titleWidth}/>

      <PostsGrid allPost={allPost} posts={posts} pageContext={pageContext}/>

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
