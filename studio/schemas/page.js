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
import postsGridType from './modules/postsGrid'
import heroNewsletterType from './modules/heroNewsletter'
import categoryFeatureType from './modules/categoryFeature'
import heroInfoCallToActionType from '../schemas/modules/heroInfoCallToAction'
import titleSubtitleTextType from '../schemas/components/titleSubtitleText'
import imageTextCallToActionImageType from '../schemas/modules/imageTextCallToActionImage'
import imageWithLinkType from '../schemas/modules/imageWithLink'
import instagramEmbedType from "../schemas/modules/instagramEmbed";

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
      descrition: 'Just for editor purposes. Not shown on the frontend but still necesscary',
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [
        { type: imageWithCaptionType.name, title: "Image, Caption Module"},
        { type: textBlockType.name, title: "Text Module"},
        { type: imageCarouselCaptionLinkType.name, title: "Image Carousel, Caption, Link Module" },
        { type: heroCallToActionType.name, title: "Hero Image, Title, Text, CTA Module"},
        { type: mapType.name, title: "Map, Marker Module"},
        { type: twoColumnTitleTextCtaType.name, title: "Two Column, Title, Text, CTA Module"},
        { type: imageCarouselSubtitleTitleTextLinkType.name, title: "Hero Image Carousel, Subtitle, Title, Text, CTA Module"},
        { type: placesGridType.name, title: "Places Grid Module" },
        { type: heroNewsletterType.name, title: "Hero Newsletter, CTA, Caption Module"},
        { type: postsGridType.name, title: "Posts Grid Module" },
        { type: categoryFeatureType.name, title: "Category Feature Module" },
        { type: heroInfoCallToActionType.name, title: "Hero, Info, CTA, Caption Module" },
        { type: titleSubtitleTextType.name, title: "Title, Subtitle, Text Module" },
        { type: imageTextCallToActionImageType.name, title: "Image, Text, Image, CTA Module - Advert Compatible" },
        { type: imageWithLinkType.name, title: "Linked Image Module - Advert Compatible" },
        { type: instagramEmbedType.name, title: "Instagram Embed Module" }
        
        
        
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