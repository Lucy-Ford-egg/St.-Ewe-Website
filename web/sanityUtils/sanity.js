import { createClient } from "@sanity/client"

const projectId = process.env.SANITY_PROJECT_ID
const envDataset = process.env.SANITY_DATASET
const apiVersion = "2023-10-15"

export function getSanityPreviewClient(
  preview,
  previewDataset = envDataset
) {
  console.log("projectId", projectId)
  console.log("envDataset", envDataset)
  console.log("preview", preview)
  const client = createClient({
    projectId,
    dataset: previewDataset,
    apiVersion,
    useCdn: false, // to ensure data is fresh
    token: preview?.token,
    
  })

  console.log("Client - ", client)
  return client
}

