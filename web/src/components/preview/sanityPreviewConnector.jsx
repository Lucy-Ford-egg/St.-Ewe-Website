import { LiveQueryProvider } from "@sanity/preview-kit"
import React, { useContext, useEffect } from "react"
import { getSanityClient, getSanityPreviewClient } from "../../../sanityUtils/sanity"
import { PreviewContext } from "../../context/previewContext"

export default function SanityPreviewConnectorProvider({ children, token }) {
  const { activePreview, previewContextData } = useContext(PreviewContext)

  useEffect(() => {
    async function getSanityUserData() {
      const response = await getSanityClient()
        .config({ withCredentials: true })
        .users.getById("me")
        console.log(`Do we have a user? - ${JSON.stringify(response)}`)
    }
    getSanityUserData()
   
  }, [])

  const client = getSanityPreviewClient(previewContextData?.previewDataset)


  if (!activePreview) {
    console.log(`No Active Preview`)
    // Return the regular children with no draft documents
    return <>{children}</> 
  }
  console.log(`We Have Active Preview! `)
  // Preview mode enabled
  return (
    <LiveQueryProvider activePreview={activePreview ? true : false} client={client}>
      {children}
    </LiveQueryProvider>
  ) 
}
