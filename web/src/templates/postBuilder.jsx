import React, {useEffect, useContext} from "react"
import { graphql } from "gatsby"
import Modules from "../components/modules"
import {Seo} from "../components/seo"
import { PreviewContext } from "../context/previewContext"
import { useLiveQuery } from "@sanity/preview-kit"
import { getSanityPreviewClient } from "../../sanityUtils/sanity"
import { postQuery } from "../queries/documentQueries"

const PostBuilder = ({ data, pageContext }) => {
  const { title, _rawBody, mainImage, slug } = data.sanityPost

  const {
    setActivePreview,
    setPreviewContextData,
    setPreviewIsLoading,
    setPreviewValidationData,
    setIsNewUnpublishedDoc,
    isNewUnpublishedDoc,
  } = useContext(PreviewContext)

  const [previewData, sanityPreviewIsLoading] = useLiveQuery(null, postQuery, {
    slug: data.sanityPost.slug.current,
  })

    const sanityConfig = { projectId: process.env.SANITY_PROJECT_ID, dataset: process.env.SANITY_DATASET }


  useEffect(() => {
    const fetchData = async () => {
      console.log("slug:", slug.current)
      const client = getSanityPreviewClient()
      const post = await client.fetch(postQuery, { slug: slug.current })
      console.log("post:", post)
    }

    fetchData()
  }, [slug])


  useEffect(() => {
    // Get URL params
    const urlSearchParams = new URLSearchParams(window.location.search)
    const previewModeParameter = urlSearchParams.get("previewMode")
    const previewDatasetParameter = urlSearchParams.get("previewDataset")
    const previewValidationDataParameter = urlSearchParams.get("validation")
    const previewIsNewUnpublishedDocParameter =
      urlSearchParams.get("isNewUnpublishedDoc") === "true"

    if (previewValidationDataParameter) {
      setPreviewValidationData(JSON.parse(previewValidationDataParameter))
    }

    if (previewModeParameter) {
      setActivePreview(true)
    }
    if (previewDatasetParameter) {
      setPreviewContextData({ previewDataset: previewDatasetParameter })
    }

    if (previewIsNewUnpublishedDocParameter) {
      setIsNewUnpublishedDoc(previewIsNewUnpublishedDocParameter)
    }
  }, [])

  // Show a Loading message
  if (sanityPreviewIsLoading) {
    return <div>Loading...</div>
  }
  if (!sanityPreviewIsLoading && isNewUnpublishedDoc) {
    return (
      <div className="p-4 mt-12 rounded-md bg-yellow-50">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* <InformationCircleIcon
              className="w-5 h-5 text-yellow-700"
              aria-hidden="true"
            /> */}
          </div>
          <div className="ml-3">
            <h3 className="mb-2 font-medium text-yellow-700 text-xxxxs">
              <b>Preview mode info</b>
            </h3>
            <h3 className="font-medium leading-snug text-yellow-700 text-xxxxs">
              You have created a new document that isn't yet published. Please
              publish to access preview mode.
            </h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      { data && <Modules allFeature={data.allSanityFeature.nodes} allPlace={data.allSanityPlace.nodes} allPost={data.allSanityPost.nodes} modules={data.sanityPost.pageBuilder} pageContext={pageContext}/>}
    </>
  ) 
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const query = graphql`
query($slug: String!) {
  sanityPost( slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    title
    ...SeoPostFragment
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
  allSanityPlace {
    nodes {
      title
      slug {
        current
      }
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      displayTitle {
        _rawChildren(resolveReferences: {maxDepth: 10})
      }
      date(formatString: "M MMM YYYY")
      categories: placeCategories {
        name
      }
      excerpt
    }
  }
  allSanityPost {
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
  allSanityFeature {
    nodes {
      title
      slug {
        current
      }
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      date(formatString: "M MMM YYYY")
      categories {
        name
      }
      excerpt
    }
  }
}
`

export default PostBuilder
