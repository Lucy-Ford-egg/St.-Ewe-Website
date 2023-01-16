import { MdHolidayVillage } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import locationType from './location'
import categoriesType from './categories'
// Builder modules
import heroType from './modules/hero'
import imageWithCaptionType from './modules/imageWithCaption'
import textBlockType from './modules/textBlock'
import imageCarouselCaptionLinkType from './modules/imageCarouselCaptionLink'
import heroCallToActionType from './modules/heroCallToAction'
import mapType from './modules/map'
import twoColumnTitleTextCtaType from './modules/twoColumnTitleTextCta'

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
  name: 'places',
  title: 'Places',
  icon: MdHolidayVillage,
  type: 'document',
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
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
      rows: 2,
      type: 'text',
    }),
    
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: locationType.name }],
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
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        { type: heroType.name, title: "Hero Module"}, // hero.js (same applies for the other types)
        { type: imageWithCaptionType.name, title: "Image w/caption Module"},
        { type: textBlockType.name, title: "Text Module"},
        { type: imageCarouselCaptionLinkType.name, title: "Image Carousel, Caption, Link Module" },
        { type: heroCallToActionType.name, title: "Hero Call to Action Module"},
        { type: mapType.name, title: "Map Module"},
        {type: twoColumnTitleTextCtaType.name, title: "Two Column. Title,Text, Cta Module"}
        // { type: 'callToAction' },
        // { type: 'gallery' },
        // { type: 'form' },
        // { type: 'video' },
        // etc...
        ]
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