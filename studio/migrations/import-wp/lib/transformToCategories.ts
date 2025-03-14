import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type { WP_REST_API_Term, WP_REST_API_Category } from 'wp-types'

// Remove these keys because they'll be created by Content Lake
type StagedCategory = Omit<WP_REST_API_Term, '_createdAt' | '_updatedAt' | '_rev'>


export async function transformToCategories(
    wpDoc: WP_REST_API_Category,
  ): Promise<StagedCategory> {
    const doc: StagedCategory = {
      _id: `categories-${JSON.stringify(wpDoc.id)}`,
      _type: 'categories',
    }

  doc.title = decode(wpDoc.name)
  doc.name = decode(wpDoc.name)
  doc.slug = {_type: 'slug', current: decode(wpDoc?.slug)}

  return doc
}