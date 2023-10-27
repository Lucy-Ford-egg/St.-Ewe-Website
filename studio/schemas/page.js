import { MdAutoStories } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import openGraph from '../schemas/openGraph'
import siteMeta from '../schemas/siteMeta'

// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import unitsListsSectionType from './modules/unitsListsSection'
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'

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
  name: "page",
  title: "Page",
  icon: MdAutoStories,
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
    // {
    //   name: 'meta',
    //   title: 'Page Meta'
    // }
  ],
  fields: [
    // ...siteMeta.fields, ...openGraph.fields,
    // {name: 'anothertitle', title: 'Title', type: 'string'},
    // {name: 'icon', title: 'Icon', type: 'image'},
    // {name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo'},
    // {name: 'seoKeywords', title: 'Keywords', type: 'string', group: 'seo'},
    // {name: 'seoSlug', title: 'Slug', type: 'slug', group: 'seo'},
    // {name: 'seoImage', title: 'Image', type: 'image', group: 'seo'},
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Just for editor purposes. Not shown on the frontend but still necesscary',
      validation: (rule) => rule.required(),
       group: 'pageContent',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The slug is what your page name is called in url. Either click the generate button to format your page title into hyphenated lowercase or type your own slug. (when typing your own slug use caution not to use a duplicate slug)',
      options: {
        source: 'pageTitle',
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
       group: 'pageContent'
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [
        { type: headerSectionAccommodationSearchType.name },
        { type: unitsListsSectionType.name },
        { type: featureSectionType.name},
        { type: videoSectionType.name}, 
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
        { type: heroInfoCallToActionType.name, title: "Hero, Info, CTA, Caption Module" },
        { type: titleSubtitleTextType.name, title: "Title, Subtitle, Text Module" },
        { type: imageTextCallToActionImageType.name, title: "Image, Text, Image, CTA Module - Advert Compatible" },
        { type: imageWithLinkType.name, title: "Linked Image Module - Advert Compatible" },  
        // etc...
        ],
         group: 'pageContent',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
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