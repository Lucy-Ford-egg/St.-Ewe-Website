import {LiaFilePdfSolid, LiaMaleSolid} from 'react-icons/lia'

import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import openGraph from './openGraph'
import siteMeta from './siteMeta'

// Sections
import headerSectionType from './sections/headerSection'
import testimonialSectionType from './sections/testimonialSection'
import teamSectionType from './sections/teamSection'
import recipesSectionType from './sections/recipesSection'
import ctaSectionType from './sections/ctaSection'
import featuresListSectionType from './sections/featuresListSection'
import videoSectionType from './sections/videoSection'
import newsletterSectionType from './sections/newsletterSection'
import imageSectionType from './sections/imageSection'
import blogSectionType from './sections/blogSection'
import stepSectionType from './sections/stepsSection'
import timelineSectionType from './sections/timelineSection'
import contactSectionType from './sections/contactSection'
import locationSectionType from './sections/locationSection'
import clientLoginSectionType from './sections/clientLoginSection'

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
  icon: LiaMaleSolid,
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
  ],
  fields: [
    defineField({
      name: 'tileImage',
      title: 'Tile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'particulars',
    }),
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'particulars',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      group: 'particulars',
    }),
    defineField({
      name: 'favouriteEggs',
      title: 'Favourite Eggs',
      type: 'text',
      validation: (rule) => rule.required(),
      description: 'How do they eat their eggs?',
      group: 'particulars',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'tileImage',
    },
    prepare({title, media, date}) {
      const subtitles = [date && `on ${format(parseISO(date), 'LLL d, yyyy')}`].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
