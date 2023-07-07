import React from "react"
import { graphql } from "gatsby"
import {Container} from "@mui/material"
import Layout from "../components/layout"
import Modules from "../utils/modules"


export default function Blog({ data, moduleSpacing, pageContext  }) {

  return (
    <Layout>
      
      {/* <Container maxWidth="xl" sx={{ pt: { xs: 9 } }}>
        <TitleSubtitleText displayTitle={data.sanityPost.displayTitle} subtitle={data.sanityPost.category?.name} text={data.sanityPost?.excerpt} titleSize="h1" subtitlePosition={true} titleWidth="100%" adornment={true}/>
      </Container> */}
      
      {/* <PostsGrid posts={data.allSanityPost.nodes} allPost={data.allSanityPost.nodes} pageContext={pageContext}/> */}
     
      <Modules posts={data.allSanityPost.nodes} allPost={data.allSanityPost.nodes} modules={data.sanityPage?.pageBuilder} pageContext={pageContext}/>
     
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allSanityPost(sort: { date: DESC }
      limit: $limit
      skip: $skip) {
      nodes {
        coverImage {
          asset {
            gatsbyImageData(width: 525, height: 323)
          }
        }
        title
        displayTitle {
          _rawChildren(resolveReferences: {maxDepth: 10})
        }
        date(formatString: "M MMM YYYY")
        categories {
          name
        }
        slug {
          current
        }
        excerpt
      }
    }
    sanityPage(slug: {current: {eq: "blog"}}) {
      slug {
        current
      }
      pageBuilder {
        ... on SanityImageCarouselSubtitleTitleTextLink {
          _key
          _type 
          carousel {
          ... CarouselFragment
          }
        }
        ... on SanityPlacesGrid {
          _key
          _type
          ... PlacesGridFragment
        }
        ... on SanityImageWithCaption {
          _key
          _type
          ... ImageCaptionFragment
        }
        ... on SanityTextBlock{
          _key
          _type
          ... TextFragment
        }
        ... on SanityImageCarouselCaptionLink{
          _key
          _type 
          ... GalleryCarouselFragment
        }
        ... on SanityHeroCallToAction{
          _key
          _type
          ...HeroCallToActionFragment
        }
        ... on SanityHeroNewsletter{
          _key
          _type
          ...HeroNewsletterFragment
        }
        ... on SanityPostsGrid {
          _key
          _type
          ... PostsGridFragment
        }
        ... on SanityTwoColumnTitleTextCta {
          _key
          _type
          ... MultiColumnTitleTextLinkFragment
        }
        ... on SanityMap{
          _key
          _type
          ... MapFragment
        }
        ... on SanityCategoryFeature{
          _key
          _type
          ... CategoryFeatureFragment
        }
        ... on SanityHeroInfoCallToAction {
          _key
          _type
          ... HeroInfoCallToActionFragment
        }
        ... on SanityTitleSubtitleText {
          _key
          _type
          ...TitleSubtitleTextFragment
        }
        ... on SanityImageTextCallToActionImage {
          _key
          _type
          ... ImageTextCallToActionImage
        }
        ... on SanityImageWithLink {
          _key
          _type
          ... ImageLinkFragment
        }
      }
    }
  }
`