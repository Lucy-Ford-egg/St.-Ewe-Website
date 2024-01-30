import { MdOutlineChat } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import openGraph from '../schemas/openGraph'
import authorType from './author'
import categoriesType from './categories'

// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'
import featuresListSectionType from './modules/featuresListSection'
import ctaSectionType from './modules/ctaSection'
import servicesSectionType from "./modules/servicesSection"
import testimonialSectionType from "./modules/testimonialSection"
import imageCarouselSectionType from "./modules/imageCarouselSection"
import locationSectionType from "./modules/locationSection"
import faqsSectionType from "./modules/faqsSection"
import benifitsSectionType from "./modules/benifitsSection"
import contactSectionType from './modules/contactSection'

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
    // {
    //   name: 'og',
    //   title: 'SEO',
    // },
  ],
  fields: [
    //...openGraph.fields,
  defineField({
    name: 'coverImage',
    title: 'Cover Image',
    type: 'image',
    options: {
      hotspot: true,
    },
    validation: Rule => Rule.required(),
    group: 'pageContent',
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    validation: (rule) => rule.required(),
    group: 'pageContent',
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
    group: 'pageContent',
  }),
  defineField({
    name: 'excerpt',
    title: 'Excerpt',
    rows: 2,
    type: 'text',
    description: 'Small snippet of text shown on the blog tile when hovered.',
    group: 'pageContent',
    validation: (rule) => rule.required().max(252)
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
        ]
      }
    }, {
      type: 'image'
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
      { type: headerSectionAccommodationSearchType.name },
      { type: featureSectionType.name},
      { type: videoSectionType.name},
      { type: featuresListSectionType.name }, 
      { type: ctaSectionType.name },
      { type: servicesSectionType.name}, 
      { type: testimonialSectionType.name},
      { type: imageCarouselSectionType.name},
      { type: locationSectionType.name},
      { type: faqsSectionType.name},
      { type: benifitsSectionType.name},
      { type: contactSectionType.name},
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
    // to: [{ type:  }],
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