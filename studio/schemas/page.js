import {MdAutoStories} from 'react-icons/md'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import openGraph from '../schemas/openGraph'
import siteMeta from '../schemas/siteMeta'

// Sections 
import headerSectionType from './sections/headerSection'
import testimonialSectionType from './sections/testimonialSection'
import teamSectionType from './sections/teamSection'

// Modules
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'
import featuresListSectionType from './modules/featuresListSection'
import ctaSectionType from './modules/ctaSection'
import servicesSectionType from './modules/servicesSection'

import imageCarouselSectionType from './modules/imageCarouselSection'
import locationSectionType from './modules/locationSection'
// import faqsSectionType from './modules/faqsSection'
import benifitsSectionType from './modules/benifitsSection'
import contactSectionType from './modules/contactSection'
import blogSectionType from './modules/blogSection'

// import imageWithCaptionType from './modules/imageWithCaption'
// import textBlockType from './modules/textBlock'
// import imageCarouselCaptionLinkType from './modules/imageCarouselCaptionLink'
// import heroCallToActionType from './modules/heroCallToAction'
// import mapType from './modules/map'
// import twoColumnTitleTextCtaType from './modules/twoColumnTitleTextCta'
// import imageCarouselSubtitleTitleTextLinkType from './modules/imageCarouselSubtitleTitleTextLink'
// import postsGridType from './modules/postsGrid'
// import heroNewsletterType from './modules/heroNewsletter'
// import heroInfoCallToActionType from '../schemas/modules/heroInfoCallToAction'
// import titleSubtitleTextType from '../schemas/components/titleSubtitleText'
// import imageTextCallToActionImageType from '../schemas/modules/imageTextCallToActionImage'
// import imageWithLinkType from '../schemas/modules/imageWithLink'
// import testimonialSection from "./section/testimonialSection";

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
  icon: MdAutoStories,
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
      description:
        'The slug is what your page name is called in url. Either click the generate button to format your page title into hyphenated lowercase or type your own slug. (when typing your own slug use caution not to use a duplicate slug)',
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
      group: 'pageContent',
    }),
    defineField({
      title: 'Nav Colour',
      name: 'navColor',
      type: 'simplerColor',
      group: 'pageContent',
    }),
    defineField({
      title: 'Nav Overlay',
      name: 'navOverlay',
      type: 'boolean',
      group: 'pageContent',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description:
        'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [
        {type: headerSectionType.name},
        {type: testimonialSectionType.name},
        {type: teamSectionType.name},

        {type: featureSectionType.name},
        {type: videoSectionType.name},
        {type: featuresListSectionType.name},
        {type: ctaSectionType.name},
        {type: servicesSectionType.name},
        {type: imageCarouselSectionType.name},
        {type: locationSectionType.name},
        //{type: faqsSectionType.name},
        {type: benifitsSectionType.name},
        {type: contactSectionType.name},
        {type: blogSectionType.name},
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
    prepare({title, media, location, date}) {
      const subtitles = [
        location && `in ${location}`,
        date && `published on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
