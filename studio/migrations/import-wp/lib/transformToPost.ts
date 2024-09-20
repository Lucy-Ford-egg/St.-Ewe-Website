import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type {SanityClient} from 'sanity'
import type {WP_REST_API_Post} from 'wp-types'

import type {Post} from '../../../sanity.types'
import {sanityIdToImageReference} from './sanityIdToImageReference'
import {sanityUploadFromUrl} from './sanityUploadFromUrl'
import {wpImageFetch} from './wpImageFetch'

// Remove these keys because they'll be created by Content Lake
type StagedPost = Omit<Post, '_createdAt' | '_updatedAt' | '_rev'>


export async function transformToPost(
    wpDoc: WP_REST_API_Post,
    client: SanityClient,
    existingImages: Record<string, string> = {},
  ): Promise<StagedPost> {
    const doc: StagedPost = {
      _id: `post-${wpDoc.id}`,
      _type: 'post',
    }

  doc.title = decode(wpDoc.title.rendered)

  if (wpDoc.slug) {
    console.log(`There's a slug`)
    doc.slug = {_type: 'slug', current: decode(wpDoc.slug)}
  }

  if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    console.log(`There's categories`)
    doc.categories = wpDoc.categories.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `categories-${JSON.stringify(catId)}`,
    }))
  }

  // if (wpDoc.author) {
  //   console.log(`There's an author`)
  //   doc.author = {
  //     _type: 'reference',
  //     _ref: `author-${wpDoc.author}`,
  //   }
  // }

  if (wpDoc.date) {
    console.log(`There's a date`)
    doc.date = wpDoc.date
  }

  if (wpDoc.modified) {
    console.log(`There's a modified`)
    doc.modified = wpDoc.modified
  }

  if (wpDoc.status) {
    console.log(`There's a status`)
    doc.status = wpDoc.status as StagedPost['status']
  }

  //doc.sticky = wpDoc.sticky == true

  if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
    // Image exists already in dataset
    if (existingImages[wpDoc.featured_media]) {
      doc.featuredMedia = sanityIdToImageReference(existingImages[wpDoc.featured_media])
      doc.tileImage = sanityIdToImageReference(existingImages[wpDoc.featured_media])
    } else {
      // Retrieve image details from WordPress
      const metadata = await wpImageFetch(wpDoc.featured_media)

      if (metadata?.source?.url) {
        // Upload to Sanity
        const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)

        if (asset) {
          doc.featuredMedia = sanityIdToImageReference(asset._id)
          doc.tileImage = sanityIdToImageReference(asset._id)
          existingImages[wpDoc.featured_media] = asset._id
        }
      }
    }
  }


  return doc
}