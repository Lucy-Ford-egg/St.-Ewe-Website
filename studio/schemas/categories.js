import { MdCategory } from "react-icons/md";
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

export default defineType({
  name: 'categories',
  title: 'Post Categories',
  icon: MdCategory,
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => { 
          return (
          context.defaultIsUnique(value, context)
        )},
      },
      validation: (rule) => rule.required(),
      group: 'pageContent',
    }),
    // defineField({
    //   name: 'excerpt',
    //   title: 'Excerpt',
    //   rows: 2,
    //   type: 'text',
    //   description: 'Small snippet of text shown on the blog tile when hovered.',
    //   group: 'pageContent',
    //   validation: (rule) => rule.required().max(252)
    // }),
    // defineField({
    //   name: 'date',
    //   title: 'Date',
    //   type: 'datetime',
    //   initialValue: () => new Date().toISOString(),
    //   group: 'pageContent',
    // }),
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
        // etc...
      ],
      group: 'pageContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title}) {
    

      return { title }
    },
  },
})