import { LiaBookOpenSolid } from "react-icons/lia"
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
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
  name: 'page',
  title: 'Page',
  icon: LiaBookOpenSolid,
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
    // defineField({name: 'anothertitle', title: 'Title', type: 'string'}),
    // defineField({name: 'icon', title: 'Icon', type: 'image'}),
    // defineField({name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo'}),
    // defineField({name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo'}),
    // defineField({name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo'}),
    // defineField({name: 'seoImage', title: 'Image', type: 'image', group: 'seo'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Just for editor purposes. Not shown on the frontend but still necesscary',
      validation: (rule) => rule.required(),
      group: 'pageContent',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The slug is what your page name is called in url. Either click the generate button to format your page title into hyphenated lowercase or type your own slug. (when typing your own slug use caution not to use a duplicate slug)',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'pageContent',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
      location: 'location.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, location, date }) {
      const subtitles = [
        location && `in ${location}`,
        date && `published on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
