import { MdFormatQuote } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import openGraph from '../schemas/openGraph'
import authorType from './author'
import categoriesType from './categories'

/**
 * This file is the schema definition for a quote.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:
  https://www.sanity.io/docs/schema-types
 */

export default defineType({
  name: 'quote',
  title: 'Quote',
  icon: MdFormatQuote,
  type: 'document',
  groups: [
    {
      name: 'pageContent',
      title: 'Page Content',
      default: true,
    },
    // {
    //   name: 'og',
    //   title: 'SEO',
    // },
  ],
  fields: [
    //...openGraph.fields,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Add your quote. We got a max character count on this so they don`t get too long',
      rows: 6,
      // hidden: ({ parent, value }) => !value && parent?.icon
      validation: Rule => 
        Rule.required().max(260)
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Avatar',
      validation: Rule => Rule.required(),
      options:{
        hotspot: true,
      }
    }), 
    defineField({
      name: 'citeName',
      type: 'string',
      title: 'Cite Name',
      validation: Rule => Rule.required(),
      description: 'Add the persons name.',
    }),
    defineField({
      name: 'citeLocation',
      type: 'string',
      title: 'Text',
      description: 'Add some context around the person giving the quote. Example: Founder.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})