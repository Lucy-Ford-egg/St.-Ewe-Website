import { MdAutoStories } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import locationType from './location'
import categoriesType from './categories'
import imageWithCaptionType from './modules/imageWithCaption'
import textBlockType from './modules/textBlock'
import imageCarouselCaptionLinkType from './modules/imageCarouselCaptionLink'
import heroCallToActionType from './modules/heroCallToAction'
import mapType from './modules/map'
import twoColumnTitleTextCtaType from './modules/twoColumnTitleTextCta'
import imageCarouselSubtitleTitleTextLinkType from './modules/imageCarouselSubtitleTitleTextLink'
import placesGridType from './modules/placesGrid'
import heroNewsletterType from './modules/heroNewsletter'

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
  name: "page",
  title: "Page",
  icon: MdAutoStories,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        { type: imageWithCaptionType.name, title: "Image w/caption Module"},
        { type: textBlockType.name, title: "Text Module"},
        { type: imageCarouselCaptionLinkType.name, title: "Image Carousel, Caption, Link Module" },
        { type: heroCallToActionType.name, title: "Hero Call to Action Module"},
        { type: mapType.name, title: "Map Module"},
        { type: twoColumnTitleTextCtaType.name, title: "Two Column. Title,Text, Cta Module"},
        { type: imageCarouselSubtitleTitleTextLinkType.name, title: "Hero Carousel. Subtitle, Title, Text, Cta Module"},
        { type: placesGridType.name, title: "Places Grid Module" },
        { type: heroNewsletterType.name, title: "Hero Newsletter Module"}
        // etc...
        ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: categoriesType.name }],
        },
     ]
      // to: [{ type:  }],
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