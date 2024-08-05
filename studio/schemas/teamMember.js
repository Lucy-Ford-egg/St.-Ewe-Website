import { MdPictureAsPdf, MdAccessibilityNew } from "react-icons/md";

import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import openGraph from '../schemas/openGraph'
import siteMeta from '../schemas/siteMeta'

// Sections 
import headerSectionType from './sections/headerSection'
import testimonialSectionType from './sections/testimonialSection'
import teamSectionType from './sections/teamSection'
import caseStudySectionType from './sections/caseStudySection'
import ctaSectionType from '../schemas/sections/ctaSection'
import featuresListSectionType from '../schemas/sections/featuresListSection'
import videoSectionType from '../schemas/sections/videoSection'
import newsletterSectionType from '../schemas/sections/newsletterSection'
import imageCarouselSectionType from '../schemas/sections/imageCarouselSection'
import blogSectionType from './modules/blogSection'
import stepSectionType from '../schemas/sections/stepsSection'
import timelineSectionType from '../schemas/sections/timelineSection'
import contactSectionType from '../schemas/sections/contactSection'
import locationSectionType from '../schemas/sections/locationSection'
import clientLoginSectionType from '../schemas/sections/clientLoginSection'


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
  name: 'teamMember',
  title: 'Team Member',
  icon: MdAccessibilityNew,
  type: 'document',
  groups: [
    {
      name: 'particulars',
      title: 'Particulars',
      default: true,
    },
    {
      name: 'pageContent',
      title: 'Page Content',
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
      validation: (rule) => rule.required(),

    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      //validation: Rule => Rule.required(),
      validation: Rule => Rule.required(),
      group: 'particulars',
      description: 'This is used on the single team member page.'
    }),
    defineField({
      name: 'tileImage',
      title: 'Tile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      //validation: Rule => Rule.required(),
      validation: Rule => Rule.required(),
      group: 'particulars',
      description: 'This is used on the tile.'

    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'particulars',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The slug is what your page name is called in url. Either click the generate button to format your page title into hyphenated lowercase or type your own slug. (when typing your own slug use caution not to use a duplicate slug)',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
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
      name: 'position',
      title: 'Position',
      type: 'string',
      group: 'particulars',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'particulars',
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile',
      type: 'url',
      // validation: (rule) => rule.required(),
      group: 'particulars',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Add a short intro into the team member',
      group: 'particulars',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ],
          annotations: [
            {
              name: 'internalLink',
              type: 'object',
              title: 'Internal link',
              fields: [
                {
                  name: 'reference',
                  type: 'reference',
                  title: 'Reference',
                  to: [
                    { type: 'post' }, {type: 'page'}
                    // other types you may want to link to
                  ]
                }
              ]
            },
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  default: true,
                  type: 'boolean'
                }
              ]
            },
            {type: 'file', icon: MdPictureAsPdf},
            {type: 'textColor',},
            // {type: 'imageOptions'},  
          ],
        },
      }, {
        type: 'image',
        validation: (rule) => rule.required(),
      }],
      group: 'pageContent',
      //validation: (rule) => rule.required(),
      description: 'Add a long form interview with the team member. If this is populated then a this an individual team member page will be created and this content will make up the body of the page'
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [
        {type: headerSectionType.name},
        {type: testimonialSectionType.name},
        {type: teamSectionType.name},
        {type: caseStudySectionType.name},
        {type: videoSectionType.name},
        {type: featuresListSectionType.name},
        {type: ctaSectionType.name},
        {type: newsletterSectionType.name},
        {type: imageCarouselSectionType.name},
        {type: blogSectionType.name},
        {type: stepSectionType.name},
        {type: timelineSectionType.name},
        { type: locationSectionType.name},
        { type: contactSectionType.name},
        { type: clientLoginSectionType.name},

        // { type: servicesSectionType.name },
        // { type: locationSectionType.name },
        // // { type: faqsSectionType.name},
        // { type: benifitsSectionType.name },
        // { type: contactSectionType.name },
        // etc...
      ],
      group: 'pageContent',
    }),

  ],
  preview: {
    select: {
      title: 'title',

      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})