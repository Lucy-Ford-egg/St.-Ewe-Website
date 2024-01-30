// sanity/store.ts

import { createClient } from "@sanity/client/stega";
import { createQueryStore } from "@sanity/react-loader";

export const STUDIO_ORIGIN =
process.env.GATSBY_STUDIO_ORIGIN || "http://localhost:3333";

// Only enable Stega encoded strings in preview
export const STEGA_ENABLED = process.env.NODE_ENV !== "production";

// Configure the client for production
const client = createClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  apiVersion: "2023-08-01",
  useCdn: true,
  perspective: "published",

  // The 'stega' object groups stega-specific options
  // stega: {
  //   enabled: STEGA_ENABLED,
  //   studioUrl: STUDIO_ORIGIN,
// 
  //   // High fidelity control over what strings to stega-encode
  //   // filter: ({sourcePath, sourceDocument, resultPath, value, filterDefault}) => boolean
  //   // Rich debug information
  //   // logger: console,
  // },
});

// Export the loader utilities
export const { loadQuery, useQuery, useLiveMode } = createQueryStore({
  client,
});