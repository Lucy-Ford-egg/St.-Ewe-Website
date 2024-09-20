import { createClient } from '@sanity/client';
import pLimit from 'p-limit';
import { createOrReplace, defineMigration } from 'sanity/migrate';
import type { WP_REST_API_Post, WP_REST_API_Term } from 'wp-types';

import { getDataTypes } from './lib/wpGetDataTypes';
import { sanityFetchImages } from './lib/sanityFetchImages';
import { transformToPost } from './lib/transformToPost';
import { transformToRecipe } from './lib/transformToRecipe';
import {transformToCategories} from './lib/transformToCategories';
import { wpDataTypeFetch } from './lib/wpDataTypeFetch';

const limit = pLimit(5);

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config());

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client);

    const { wpType } = getDataTypes(process.argv);
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        let wpData = await wpDataTypeFetch(wpType, page);

        if (Array.isArray(wpData) && wpData.length) {
          // Create an array of concurrency-limited promises to stage documents
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              let doc: any;
              if (wpType === 'posts') {
                wpDoc = wpDoc as WP_REST_API_Post;
                doc = await transformToPost(wpDoc, client, existingImages);
                console.log(`Transformed post document: ${JSON.stringify(doc, null, 2)}`);
              } else if (wpType === 'recipe') {
                wpDoc = wpDoc as WP_REST_API_Post;
                doc = await transformToRecipe(wpDoc, client, existingImages);
                console.log(`Transformed recipe document: ${JSON.stringify(doc, null, 2)}`);
              } else if (wpType === 'pages') {
                wpDoc = wpDoc as WP_REST_API_Post;
                // Add a transformer function here if necessary
              } else if (wpType === 'categories') {
                wpDoc = wpDoc as WP_REST_API_Term;
                // Add a transformer function here if necessary
                doc = await transformToCategories(wpDoc);
              } else {
                hasMore = false;
                throw new Error(`Unhandled WordPress type: ${wpType}`);
              }

              // Validate document has _type and _id
              if (!doc._type || !doc._id) {
                console.error(`Invalid document structure: ${JSON.stringify(doc, null, 2)}`);
                throw new Error('Document is missing required fields (_type or _id)');
              }

              return doc;
            })
          );

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs);

          // Log resolved documents before yielding
          resolvedDocs.forEach((doc) => {
            console.log(`Yielding document for createOrReplace: ${JSON.stringify(doc, null, 2)}`);
          });

          // Yield resolved documents to the migration
          try {
            yield resolvedDocs.map((doc) => {
              console.log(`Creating or replacing doc: ${doc._id}`);
              return createOrReplace(doc);
            });
          } catch (err) {
            console.error('Error while replacing documents:', err);
          }

          // Move to next page
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error);
        hasMore = false; // Stop the loop in case of an error
      }
    }
  },
});
