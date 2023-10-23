import React from "react"
import { graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const Seo = ({ location, children, data, seoContext }) => {
 
  const { metaDescription, metaTitle, ogDescription, ogTitle, ogImage } =
  seoContext && seoContext || {metaDescription: null, metaTitle: null, ogDescription: null, ogTitle: null, ogImage: null}

  const { title: defaultTitle, description: defaultDescription } =
    useSiteMetadata()

  const siteUrl = process.env.GATSBY_FRONTEND
  const seo = {
    title: metaTitle || defaultTitle,
    description: metaDescription || defaultDescription,
    url: `${siteUrl}${location.pathname || ``}`,
  }

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* <meta property="og:type" content="article" /> */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImage && <meta property="og:image" content={ogImage.asset.url} />}
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={defaultTitle} />

      {ogTitle && <meta name="twitter:title" content={ogTitle} />}
      <meta name="twitter:url" content={seo.url} />
      {ogDescription && (
        <meta name="twitter:description" content={ogDescription} />
      )}
      {ogImage && <meta name="twitter:image" content={ogImage.asset.url} />}
      <link rel="canonical" href={seo.url} />
      {children}
    </>
  )
}

export const query = graphql`
  fragment SeoPageFragment on SanityPage {
    metaDescription
    metaTitle
    ogDescription
    ogTitle
    ogImage {
      asset {
        url
      }
    }
  }
  fragment SeoPostFragment on SanityPost {
    metaDescription
    metaTitle
    ogDescription
    ogTitle
    ogImage {
      asset {
        url
      }
    }
  }
  fragment SeoPlaceFragment on SanityPlace {
    metaDescription
    metaTitle
    ogDescription
    ogTitle
    ogImage {
      asset {
        url
      }
    }
  }
  fragment SeoFeaturesFragment on SanityFeature {
    metaDescription
    metaTitle
    ogDescription
    ogTitle
    ogImage {
      asset {
        url
      }
    }
  }
`
