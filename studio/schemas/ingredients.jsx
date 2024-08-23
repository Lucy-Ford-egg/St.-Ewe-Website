import { LiaCarrotSolid, LiaFilePdfSolid } from "react-icons/lia";

import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import authorType from './author'
import categoriesType from './categories'
import openGraph from './openGraph'
import siteMeta from './siteMeta'

// Sections 
// import headerSectionType from './sections/headerSection'
import testimonialSectionType from './sections/testimonialSection'
import teamSectionType from './sections/teamSection'
import recipiesSectionType from './sections/recipiesSection'
import ctaSectionType from './sections/ctaSection'
import featuresListSectionType from './sections/featuresListSection'
import videoSectionType from './sections/videoSection'
import newsletterSectionType from './sections/newsletterSection'
import imageCarouselSectionType from './sections/imageCarouselSection'
import blogSectionType from './modules/blogSection'
import stepSectionType from './sections/stepsSection'
import timelineSectionType from './sections/timelineSection'
import contactSectionType from './sections/contactSection'
import locationSectionType from './sections/locationSection'
import clientLoginSectionType from './sections/clientLoginSection'


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
  name: 'ingredients',
  title: 'Ingredients',
  icon: LiaCarrotSolid,
  type: 'document',
  // // groups: [
  //   {
  //     name: 'pageContent',
  //     title: 'Page Content',
  //     default: true,
  //   },
  //   {
  //     name: 'og',
  //     title: 'SEO',
  //   },
  //   {
  //     name: 'meta',
  //     title: 'Page Meta',
  //   },
  //   {
  //     name: 'seo',
  //     title: 'Seo Details',
  //   },
  // ],
  fields: [
    // ...siteMeta.fields,
    // ...openGraph.fields,

    // defineField({
    //   title: 'Nav Colour',
    //   name: 'navColor',
    //   type: 'simplerColor',
    //   // group: 'pageContent',
    // }),
    // defineField({
    //   title: 'Nav Overlay',
    //   name: 'navOverlay',
    //   type: 'boolean',
    //   // group: 'pageContent',
    // }),
    // defineField({
    //   name: 'image',
    //   title: 'Cover Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    //   //validation: Rule => Rule.required(),
    //   // group: 'pageContent',
    //   description: 'This is used on the single blog page.'
    // }),
    // defineField({
    //   name: 'tileImage',
    //   title: 'Tile Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    //   //validation: Rule => Rule.required(),
    //   // group: 'pageContent',
    //   description: 'This is used on the tile.'
    // }),
    // defineField({
    //   title: 'Tile Colour',
    //   name: 'tileColor',
    //   type: 'simplerColor',
    //   // group: 'pageContent',
    // }),
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      // group: 'pageContent',
      //description: 'Slug is generated from this value.'
    }),
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //     isUnique: (value, context) => { 

    //       return (
    //       context.defaultIsUnique(value, context)
    //     )},
    //   },
    //   validation: (rule) => rule.required(),
    //   //// group: 'pageContent',
    // }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      // group: 'pageContent',
    }),
    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: [{ type: authorType.name }],
    //   // group: 'pageContent',
    // }),
    // defineField({
    //   name: 'body',
    //   type: 'array',
    //   title: 'Blog Content',
    //   of: [{
    //     type: 'block',
    //     lists: [
    //       { title: 'Bullet', value: 'bullet' },
    //       { title: 'Numbered', value: 'number' }
    //     ], // yes please, both bullet and numbered
    //     styles: [
    //       // { title: 'Heading 2', value: 'h2' },
    //       { title: 'Small', value: 'caption' },
    //       { title: 'Lead', value: 'body2' },
    //       { title: 'Heading 3', value: 'h3' },
    //       { title: 'Heading 4', value: 'h4' },
    //       { title: 'Heading 5', value: 'h5' },
    //       { title: 'Quote', value: 'blockquote' }
    //     ],
    //     marks: {
    //       decorators: [
    //         { title: 'Strong', value: 'strong' },
    //         { title: 'Emphasis', value: 'em' },
    //         { title: 'Underline', value: 'underline' },
    //       ],
    //       annotations: [
    //         {
    //           name: 'internalLink',
    //           type: 'object',
    //           title: 'Internal link',
    //           fields: [
    //             {
    //               name: 'reference',
    //               type: 'reference',
    //               title: 'Reference',
    //               to: [
    //                 { type: 'post' }, {type: 'page'}
    //                 // other types you may want to link to
    //               ]
    //             }
    //           ]
    //         },
    //         {
    //           name: 'link',
    //           type: 'object',
    //           title: 'External link',
    //           fields: [
    //             {
    //               name: 'href',
    //               type: 'url',
    //               title: 'URL',
    //               validation: Rule => Rule.uri({
    //                 scheme: ['http', 'https', 'mailto', 'tel']
    //               })
    //             },
    //             {
    //               title: 'Open in new tab',
    //               name: 'blank',
    //               default: true,
    //               type: 'boolean'
    //             }
    //           ]
    //         },
    //         {type: 'file', icon: LiaFilePdfSolid},
    //         {type: 'textColor',},
    //         // {type: 'imageOptions'},  
    //       ],
    //     }
    //   },
    //   {
    //     type: 'imageOptions',
    //     validation: (rule) => rule.required(),
    //   },
    //   {
    //     type: 'image',
    //     validation: (rule) => rule.required(),
    //     readOnly: true,
    //   }
    //   // defineArrayMember({
    //   //   type: 'image',
    //   //   // Replace the preview of all block images
    //   //   // with the edit form for that image, bypassing
    //   //   // the modal step.
    //   //   components: {
    //   //     block: (props) => {
    //   //       return props.renderDefault({
    //   //         ...props,
    //   //         renderPreview: () => props.children,
    //   //       })
    //   //     },
    //   //   },
    //   // }),
    // ],
    //   validation: (rule) => rule.required(),
    //   description: "This works slightly differently to page modules. You can add images, quotes and other textural decoration in the editor.",
    //   // group: 'pageContent',
    // }),
    // defineField({
    //   name: 'pageBuilder',
    //   type: 'array',
    //   title: 'Page builder',
    //   description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
    //   of: [
    //     { type: testimonialSectionType.name},
    //     { type: teamSectionType.name},
    //     { type: recipiesSectionType.name},
    //     { type: videoSectionType.name},
    //     { type: featuresListSectionType.name},
    //     { type: ctaSectionType.name},
    //     { type: newsletterSectionType.name},
    //     { type: imageCarouselSectionType.name},
    //     { type: blogSectionType.name},
    //     { type: stepSectionType.name},
    //     { type: timelineSectionType.name},
    //     { type: locationSectionType.name},
    //     { type: contactSectionType.name},
    //     { type: clientLoginSectionType.name},

    //     // etc...
    //   ],
    //   // group: 'pageContent',
    // }),

    defineField({
      name: 'foodGroup',
      title: 'Food Group',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        sortable: false,
        list: [
          { title: 'Protein', value: 'protein' },
          { title: 'Fruits & Vegetables', value: 'fruits-vegetables' },
          { title: 'Dairy', value: 'dairy' },
          { title: 'Carbohydrates', value: 'carbohydrates' },
          { title: 'Fats & Oils', value: 'fats-oils' },
          { title: 'Grains', value: 'grains' },
          { title: 'Seasoning', value: 'seasoning' },
          { title: 'Herbs', value: 'herbs'},
          { title: 'Spices', value: 'spices'}
        ]
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedDateDesc',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    },
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