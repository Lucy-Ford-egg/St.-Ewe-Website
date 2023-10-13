import { createClient } from "@sanity/client"

const projectId = process.env.GATSBY_SANITY_PROJECT_ID
const envDataset = process.env.GATSBY_SANITY_DATASET
const apiVersion = "2023-06-22"

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
    // token: preview?.token,
    // perspective: 'published',
  })

  console.log("Client - ", client)
  return client
}

export function getSanityClient(
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
  })

  console.log("Client - ", client)
  return client
}

