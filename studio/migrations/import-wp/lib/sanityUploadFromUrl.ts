import {Readable} from 'node:stream'
import type {SanityClient, SanityImageAssetDocument, UploadClientConfig} from '@sanity/client'

export async function sanityUploadFromUrl(
  url: string,
  client: SanityClient,
  metadata: UploadClientConfig
): Promise<SanityImageAssetDocument | null> {
  const response = await fetch(url);
  const { body } = response;

  if (!body) {
    throw new Error(`No body found for ${url}`);
  }

  let data: SanityImageAssetDocument | null = null;
  try {
    // Cast body to ReadableStream and convert it using fromWeb
    const readableBody = Readable.fromWeb(body as any);

    data = await client.assets.upload('image', readableBody, metadata);
  } catch (error) {
    console.error(`Failed to upload image from ${url}`);
    console.error(error);
    return null;
  }

  return data;
}
