import React, {useEffect, useContext} from "react"
import { PreviewContext } from "../context/previewContext"
import { useLiveQuery } from "@sanity/preview-kit"
import { getSanityPreviewClient } from "../../sanityUtils/sanity"
import { Container, Typography } from "@mui/material"

export const IncludePreview = (props) => {

  const {documentQueries, slug, data, children} = props

  const {
    setActivePreview,
    setPreviewContextData,
    setPreviewIsLoading,
    setPreviewValidationData,
    setIsNewUnpublishedDoc,
    isNewUnpublishedDoc,
  } = useContext(PreviewContext)

  const [previewData, sanityPreviewIsLoading] = useLiveQuery(null, documentQueries, {
    slug: slug.current,
  })

    const sanityConfig = { projectId: process.env.GATSBY_SANITY_PROJECT_ID, dataset: process.env.GATSBY_SANITY_DATASET }


  useEffect(() => {
    const fetchData = async () => {
      console.log("slug:", slug.current)
      const client = getSanityPreviewClient()
      const post = await client.fetch(documentQueries, { slug: slug.current })
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
      console.log(`Set Active Preview!`)
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
      <Container sx={{my:8}} maxWidth="sm">
        <Typography variant="h3" align="center">Preview mode info</Typography>
        <Typography variant="body1" align="center">You have created a new document that isn't yet published. Please publish to access preview mode.</Typography>
      </Container>
    )
  }
  return ([children])
  
}