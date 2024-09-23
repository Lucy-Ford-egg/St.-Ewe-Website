import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { uuid } from '@sanity/uuid';
import { JSDOM } from 'jsdom';
import pLimit from 'p-limit';
import type { FieldDefinition, SanityClient } from 'sanity';

import type { Post } from '../../../sanity.types';
import { BASE_URL } from '../constants';
import { sanityIdToImageReference } from './sanityIdToImageReference';
import { sanityUploadFromUrl } from './sanityUploadFromUrl';
import { wpImageFetch } from './wpImageFetch';
import { schema } from '../../../schemas';

// Explicitly typing the schema to avoid TS errors
const defaultSchema = Schema.compile({ types: schema.types });
const postSchema = defaultSchema.get('post');

// Ensure the post schema is correctly typed
if (!postSchema) {
  throw new Error('Post schema is undefined or not found');
}

// Fetch the block content schema from the post schema
const blockContentSchema = postSchema.fields.find((field: FieldDefinition) => field.name === 'content')?.type;

if (!blockContentSchema) {
  throw new Error('Content schema is undefined or not found in post schema');
}

export async function htmlToBlockContent(
  html: string,
  client: SanityClient,
  imageCache: Record<number, string>
): Promise<Post['content']> {
  // Convert HTML to Sanity's Portable Text
  let blocks = htmlToBlocks(html, blockContentSchema, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(node, next, block) {
          const el = node as HTMLElement;

          if (node.nodeName.toLowerCase() === 'figure') {
            const url = el.querySelector('img')?.getAttribute('src');

            if (!url) {
              return undefined;
            }

            return block({
              _type: 'externalImage',
              url,
            });
          }

          return undefined;
        },
      },
    ],
  });

  // p-limit to limit concurrent requests
  const limit = pLimit(2);

  const blocksWithUploads = blocks.map((block) =>
    limit(async () => {
      if (block._type !== 'externalImage' || !('url' in block)) {
        return block;
      }

      // Extract slug from the image URL
      const dimensions = /-\d+x\d+$/;
      let slug = (block.url as string)
        .split('/')
        .pop()
        ?.split('.')
        ?.shift()
        ?.replace(dimensions, '')
        .toLowerCase();

      const imageId = await fetch(`${BASE_URL}/media?slug=${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => (Array.isArray(data) && data.length ? data[0].id : null));

      if (typeof imageId !== 'number' || !imageId) {
        return block;
      }

      if (imageCache[imageId]) {
        return {
          _key: block._key,
          ...sanityIdToImageReference(imageCache[imageId]),
        } as Extract<Post['content'], { _type: 'image' }>;
      }

      const imageMetadata = await wpImageFetch(imageId);
      if (imageMetadata?.source?.url) {
        const imageDocument = await sanityUploadFromUrl(
          imageMetadata.source.url,
          client,
          imageMetadata
        );
        if (imageDocument) {
          // Cache the image to avoid re-fetching
          imageCache[imageId] = imageDocument._id;

          return {
            _key: block._key,
            ...sanityIdToImageReference(imageCache[imageId]),
          } as Extract<Post['content'], { _type: 'image' }>;
        } else {
          return block;
        }
      }

      return block;
    })
  );

  blocks = await Promise.all(blocksWithUploads);

  // Remove empty blocks
  blocks = blocks.filter((block) => {
    if (!block) {
      return false;
    } else if (!('children' in block)) {
      return true;
    }

    return block.children
      .map((c) => (c.text as string).trim())
      .join('').length > 0;
  });

  // Ensure blocks have a _key field
  blocks = blocks.map((block) => (block._key ? block : { ...block, _key: uuid() }));

  // Return blocks as the Portable Text content
  return blocks as Post['content'];
}
