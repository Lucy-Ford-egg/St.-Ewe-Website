import { LiveQueryProvider } from "@sanity/preview-kit"
import React, { useContext } from "react"
import { getSanityPreviewClient } from "../../../sanityUtils/sanity"
import { PreviewContext } from "../../context/previewContext"

export default function SanityPreviewConnectorProvider({ children, token }) {
  const { activePreview, previewContextData } = useContext(PreviewContext)
  const client = getSanityPreviewClient(
    { token },
    previewContextData?.previewDataset
  )

  if (!activePreview) {
    // Return the regular children with no draft documents
    return <>{children}</> 
  }

  // Preview mode enabled
  return (
    <LiveQueryProvider client={client} token={token}>
      {children}
    </LiveQueryProvider>
  ) 
}
