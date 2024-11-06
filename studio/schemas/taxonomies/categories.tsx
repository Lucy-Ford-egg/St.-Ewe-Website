import {LiaSortAlphaDownSolid} from 'react-icons/lia'
import {defineField, defineType} from 'sanity'

import openGraph from '../openGraph'
import siteMeta from '../siteMeta'
import {pageBuilder} from '../parts/pageBuilder'

export default defineType({
  name: 'categories',
  title: 'Post Categories',
  icon: LiaSortAlphaDownSolid,
  type: 'document',
  groups: [
    {
      name: 'pageContent',
      title: 'Page Content',
      default: true,
    },
    {
      name: 'og',
      title: 'SEO',
    },
    {
      name: 'meta',
      title: 'Page Meta',
    },
    {
      name: 'seo',
      title: 'Seo Details',
    },
  ],
  fields: [
    ...siteMeta.fields,
    ...openGraph.fields,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'pageContent',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'pageContent',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => {
          return context.defaultIsUnique(value, context)
        },
      },
      group: 'pageContent',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description:
        'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [...pageBuilder],
      group: 'pageContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {title: title}
    },
  },
})
