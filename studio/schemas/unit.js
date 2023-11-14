import { MdHolidayVillage } from "react-icons/md";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import openGraph from './openGraph'
import { MdFilePresent } from "react-icons/md";

// Modules
import headerSectionAccommodationSearchType from './modules/headerSectionAccommodationSearch'
import unitsListsSectionType from './modules/unitsListsSection'
import featureSectionType from './modules/featureSection'
import videoSectionType from './modules/videoSection'
import featuresListSectionType from './modules/featuresListSection'
import ctaSectionType from './modules/ctaSection'
import servicesSectionType from "./modules/servicesSection"
import testimonialSectionType from "./modules/testimonialSection"
import imageCarouselSectionType from "./modules/imageCarouselSection"
import locationSectionType from "./modules/locationSection"
import faqsSectionType from "./modules/faqsSection"
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
  name: 'unit',
  title: 'Unit',
  icon: MdHolidayVillage,
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
  fields: 
    [
    //...openGraph.fields,
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'This image shows in the tile as the main image.',
      group: 'pageContent',
    }),
    defineField({
      name: 'unitImages',
      type: 'array',
      title: 'Unit Images',
      of: [{
        type: 'image', 
        options: {
          hotspot: true,
        },
      }],
      description: "Images of the unit from GemaPark",
      group: 'pageContent',   
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',      
      group: 'pageContent',
      readOnly: true,   
    }),
    defineField({
      name: 'categoryId',
      type: 'number',
      title: 'Category Id',
      group: 'pageContent',
      readOnly: true,
    }),
    defineField({
      name: 'maxGrading',
      type: 'number',
      title: 'Max Grading',
      group: 'pageContent',
      readOnly: true,
    }),
    defineField({
      name: 'maxOccupancy',
      type: 'number',
      title: 'Max Occupancy',
      group: 'pageContent',
      readOnly: true,
    }),
    defineField({
      name: 'numberOfRooms',
      type: 'number',
      title: 'Number of Rooms',
      group: 'pageContent',
      readOnly: true,
    }),
    defineField({
      name: 'summary',
      type: 'string',
      title: 'Summary',
      group: 'pageContent',
      readOnly: true,
    }),
    defineField({
      name: 'extendedSummary',
      title: 'Extended Summary',
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
          // { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }, 
      // {
      //   type: 'image'
      // }
    ],
      validation: (rule) => rule.required(),
      description: "You can add titles and other textural decoration in the editor.",
      group: 'pageContent',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Tarriff & Inventory Link(s)',
      of: [
        {
          type: 'file',
          title: 'File Upload'
        }
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
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
      name: 'date',
      title: 'Date',
      type: 'date',
      dateFormat: 'M MMM YYYY',
      initialValue: () => new Date().toISOString(),
      group: 'pageContent',
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
        { type: featuresListSectionType.name }, 
        { type: ctaSectionType.name },
        {type: servicesSectionType.name}, 
        {type: testimonialSectionType.name},
        {type: imageCarouselSectionType.name},
        {type: locationSectionType.name},
        {type: faqsSectionType.name},
        // etc...
        ],
        group: 'pageContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      rows: 2,
      type: 'text',
      group: 'pageContent',
    }),
   
  ],
  preview: {
    select: {
      title: 'name',
      type: 'categoryId',
      date: 'date',
      media: 'mainImage',
    },
    prepare({ title, media, type, date }) {
      const subtitles = [
        type && `in ${type === 1 ? 'Holiday Home' : 'Camping & Touring' }`,
        date && `published on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})