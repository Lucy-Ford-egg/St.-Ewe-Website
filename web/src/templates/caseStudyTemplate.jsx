import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

import {Container, Grid, useTheme, Box, Typography, Divider} from '@mui/material'
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { RenderPortableText } from "../components/renderPortableText"
import { CategoryLabel } from "../components/categoryLabel"
import { Icons } from "../components/icons"

const CaseStudyTemplate = props => {
  const { data, pageContext, previewData, sanityConfig } = props
  const theme = useTheme()
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPost.slug} //
      data={data}
    >
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} sx={{py: 9}}>
          {data.sanityPost.image && (
                  <Image
                          // pass asset, hotspot, and crop fields
                          // {...testimonialTiles[slideIndex].image}
                          crop={
                            (previewData &&
                              previewData?.image?.crop) ||
                              data.sanityPost.image.crop
                          }
                          hotspot={
                            (previewData &&
                              previewData?.image?.hotspot) ||
                              data.sanityPost.image.hotspot
                          }
                          asset={
                            getGatsbyImageData(
                              previewData &&
                                previewData?.image?.asset,
                              { maxWidth: 100 },
                              sanityConfig,
                            ) || data.sanityPost.image.asset
                          }
                          // tell Sanity how large to make the image (does not set any CSS)
                          // width={1300}
                          // style it how you want it
                          style={{
                            objectFit: "cover",
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                )}
          </Grid>
          <Grid item xs={0} sm={1} md={1}>
          
          </Grid>
          <Grid item xs={'auto'} md={'auto'}>
            <Box sx={{
              mt: 3,
              mb: {xs: 1}
            }}>
            <Icons type='bud'/>
            <Typography variant='overline'>Published on</Typography>
            <Divider sx={{
                      borderColor: theme.palette.primary.main,
                    }}/>
            <Typography variant='caption'>{data.sanityPost.date}</Typography>
            </Box>
          </Grid>
          <Grid item xs={0} sm={1} md={1}>
          
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <CategoryLabel label={data.sanityPost.category.name}/>
            <Typography variant='h1'>{data.sanityPost.title}</Typography>
            {data.sanityPost._rawBody && (
                <Box sx={{ py: { xs: 6, md: 10 } }}>
                  <RenderPortableText previewData={previewData} sanityConfig={sanityConfig} color='text.main' variant={false} value={previewData && previewData._rawBody ? previewData._rawBody : data.sanityPost._rawBody}/>
                </Box>
              )}
          </Grid>
        </Grid>
      </Container>
      <Modules
        pageContext={pageContext}
        modules={data?.sanityPost?.pageBuilder}
      />
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const caseStudyTemplateQuery = graphql`
 query caseStudyTemplateQuery($slug: String!) {
   sanityCaseStudy( slug: {current: {eq: $slug}}) {
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      category {
        name
      }
      image : coverImage {
          asset {
            _id
  
            gatsbyImageData
          }
          hotspot {
            x
            y
            width
            height
          }
          crop {
            bottom
            left
            right
            top
          }
        }
      _rawBody(resolveReferences: {maxDepth: 10})
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
        }
        ... on SanityFeatureSection {
          ...FeatureSectionFragment
        }
        ... on SanityTeamSection {
          ...TeamSectionFragment
        }
        ... on SanityVideoSection {
          ...VideoSectionFragment
        }
        ... on SanityFeaturesListSection {
          ...FeaturesListSectionFragment
        }
        ... on SanityCtaSection {
          ...CtaSectionFragment
        }
        ... on SanityServicesSection {
          ...ServicesSectionFragment
        }
        ... on SanityTestimonialSection {
          ...TestimonialSectionFragment
        }
        ... on SanityImageCarouselSection {
          ...ImageCarouselSectionFragment 
        }
        ... on SanityLocationSection {
          ...LocationSectionFragment
        } 
        
        ... on SanityBenifitsSection {
          ... BenifitsSectionFragment
        }
        ... on SanityContactSection {
          ... ContactSectionFragment
        }  
      }
    }
  }
`
export default CaseStudyTemplate
