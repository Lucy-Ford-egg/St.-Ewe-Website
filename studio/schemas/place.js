import { MdHolidayVillage } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import locationType from './location'
import categoriesType from './categories'
// Builder modules
import imageWithCaptionType from './modules/imageWithCaption'
import textBlockType from './modules/textBlock'
import imageCarouselCaptionLinkType from './modules/imageCarouselCaptionLink'
import heroCallToActionType from './modules/heroCallToAction'
import mapType from './modules/map'
import twoColumnTitleTextCtaType from './modules/twoColumnTitleTextCta'
import imageCarouselSubtitleTitleTextLinkType from './modules/imageCarouselSubtitleTitleTextLink'
import placesGridType from './modules/placesGrid'
import postsGridType from './modules/postsGrid'
import heroNewsletterType from "./modules/heroNewsletter"
import categoryFeatureType from './modules/categoryFeature'
import heroInfoCallToActionType from '../schemas/modules/heroInfoCallToAction'
import titleSubtitleTextType from '../schemas/components/titleSubtitleText'
import imageTextCallToActionImageType from '../schemas/modules/imageTextCallToActionImage'
import imageWithLinkType from '../schemas/modules/imageWithLink'
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
  name: 'place',
  title: 'Place',
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
      description: 'This image shows in the tile as the cover image.'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      descrition: 'Just for editor purposes. Not shown on the frontend but still necessary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayTitle',
      type: 'array',
      title: 'Display Title',
      of: [{ 
        type: 'block',
        lists: [], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          // { title: 'Heading 4', value: 'h4' },
        ],
        marks: {
          decorators: [],
          annotations: []
        }
      }],
      validation: (rule) => rule.required(),
      description: "Shown on the frontend. Sometimes titles look better being broken onto 2 lines. Use a soft return (shift + return) in the position of the string of text to achieve this.",   
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
      name: 'date',
      title: 'Date',
      type: 'date',
      dateFormat: 'M MMM YYYY',
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
        { type: imageWithCaptionType.name, title: "Image w/caption Module"},
        { type: textBlockType.name, title: "Text Module"},
        { type: imageCarouselCaptionLinkType.name, title: "Image Carousel, Caption, Link Module" },
        { type: heroCallToActionType.name, title: "Hero Call to Action Module"},
        { type: mapType.name, title: "Map Module"},
        { type: twoColumnTitleTextCtaType.name, title: "Two Column. Title,Text, Cta Module"},
        { type: imageCarouselSubtitleTitleTextLinkType.name, title: "Hero Carousel. Subtitle, Title, Text, Cta Module"},
        { type: placesGridType.name, title: "Places Grid Module" },
        { type: heroNewsletterType.name, title: "Hero Newsletter Module"},
        { type: postsGridType.name, title: "Posts Grid Module" },
        { type: categoryFeatureType.name, title: "Category Feature Module" },
        { type: heroInfoCallToActionType.name, title: "Hero Info Cta Module" },
        { type: titleSubtitleTextType.name, title: "Title, Subtitle, Text Module" },
        { type: imageTextCallToActionImageType.name, title: "Image, Text, Cta, Image Module - Advert Compatible" },
        { type: imageWithLinkType.name, title: "Linked Image Module - Advert Compatible" },

        // etc...
        ]
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      rows: 2,
      type: 'text',
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