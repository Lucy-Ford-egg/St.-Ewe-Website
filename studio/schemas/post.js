import { MdOutlineChat, MdPictureAsPdf } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import authorType from './author'
import categoriesType from './categories'
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
  icon: MdOutlineChat,
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
    name: 'image',
    title: 'Cover Image',
    type: 'image',
    options: {
      hotspot: true,
    },
    //validation: Rule => Rule.required(),
    group: 'pageContent',
  }),
  defineField({
    title: 'Tile Colour',
    name: 'tileColor',
    type: 'simplerColor',
    group: 'pageContent',
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (rule) => rule.required(),
    group: 'pageContent',
    description: 'Slug is generated from this value.'
  }),
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'title',
      maxLength: 96,
      isUnique: (value, context) => { 
   
        return (
        context.defaultIsUnique(value, context)
      )},
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
    name: 'author',
    title: 'Author',
    type: 'reference',
    to: [{ type: authorType.name }],
    group: 'pageContent',
  }),
  defineField({
    name: 'body',
    type: 'array',
    title: 'Blog Content',
    of: [{
      type: 'block',
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ], // yes please, both bullet and numbered
      styles: [
        // { title: 'Heading 2', value: 'h2' },
        { title: 'Small', value: 'caption' },
        { title: 'Lead', value: 'body2' },
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
                title: 'URL'
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
        
        ],
      }
    }, {
      type: 'image',
      validation: (rule) => rule.required(),
    }],
    validation: (rule) => rule.required(),
    description: "This works slightly differently to page modules. You can add images, quotes and other textural decoration in the editor.",
    group: 'pageContent',
  }),
  defineField({
    name: 'pageBuilder',
    type: 'array',
    title: 'Page builder',
    description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
    of: [
      { type: testimonialSectionType.name},
      { type: teamSectionType.name},
      { type: caseStudySectionType.name},
      { type: videoSectionType.name},
      { type: featuresListSectionType.name},
      { type: ctaSectionType.name},
      { type: newsletterSectionType.name},
      { type: imageCarouselSectionType.name},
      { type: blogSectionType.name},
      { type: stepSectionType.name},
      { type: timelineSectionType.name},
      { type: locationSectionType.name},
      { type: contactSectionType.name},
      { type: clientLoginSectionType.name},
      
      // etc...
    ],
    group: 'pageContent',
  }),

  defineField({
    name: 'category',
    title: 'Post Category',
    type: 'reference',
    to: [{ type: categoriesType.name }],
    group: 'pageContent',
    validation: (rule) => rule.required(),
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
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title: title && title, media, subtitle: subtitles.join(' ,') }
    },
  },
})