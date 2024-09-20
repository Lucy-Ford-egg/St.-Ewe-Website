import { LiaNewspaper, LiaFilePdfSolid } from "react-icons/lia";

import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import author from './author'
import categories from './taxonomies/categories'
import openGraph from './openGraph'
import siteMeta from './siteMeta'

import { pageBuilder } from "./parts/pageBuilder"

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:
  https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'post',
  title: 'Post',
  icon: LiaNewspaper,
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

    // !
    defineField({name: 'title', type: 'string', group: 'pageContent'}),
    defineField({
      name: 'slug', 
      type: 'slug', 
      // options: {
      //   source: 'title',
      //   maxLength: 96,
      //   isUnique: (value, context) => { 
     
      //     return (
      //     context.defaultIsUnique(value, context)
      //   )},
      // },
      // validation: (rule) => rule.required(),
      group: 'pageContent'
    }),
    defineField({
      name: 'date', 
      type: 'datetime', 
       //initialValue: () => new Date().toISOString(),
      group: 'pageContent',
    }),
    defineField({name: 'modified', type: 'datetime', group: 'pageContent'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'publish'},
          {title: 'Future', value: 'future'},
          {title: 'Draft', value: 'draft'},
          {title: 'Pending', value: 'pending'},
          {title: 'Private', value: 'private'},
          {title: 'Trash', value: 'trash'},
          {title: 'Auto-Draft', value: 'auto-draft'},
          {title: 'Inherit', value: 'inherit'},
        ],
      },
      group: 'pageContent',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [...pageBuilder],
      group: 'pageContent',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      group: 'pageContent',
    }),
    defineField({
      name: 'excerpt',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      group: 'pageContent',
    }),
    defineField({
      name: 'featuredMedia', 
      type: 'image',
      // options: {
      //   hotspot: true,
      // },
      //validation: Rule => Rule.required(),
      group: 'pageContent',
      description: 'This is used on the featured image.'
    }),
    defineField({
      name: 'tileImage',
      title: 'Tile Image',
      type: 'image',
      // options: {
      //   hotspot: true,
      // },
      //validation: Rule => Rule.required(),
      group: 'pageContent',
      description: 'This is used on the tile.'
    }),
    
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: author.name}],
      group: 'pageContent',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: categories.name }]}],
      group: 'pageContent',
      //validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'category',
    //   title: 'Post Category',
    //   type: 'reference',
    //   to: [{ type: categoriesType.name }],
      
    // }),
  ],
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedDateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'featuredImage',
      author: 'author',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title: title && title, media, subtitle: subtitles.join(' ,') }
    },
  },
})