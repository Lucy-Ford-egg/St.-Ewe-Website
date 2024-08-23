import { LiaUtensilsSolid, LiaCarrotSolid,  LiaStopwatchSolid } from "react-icons/lia"
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import authorType from './author'
import recipieCategoryType from './taxonomies/recipiesCategory'
import openGraph from './openGraph'
import siteMeta from './siteMeta'

// Sections 
import headerSectionType from './sections/headerSection'
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


export default defineType({
  name: 'recipies',
  title: 'Recipie',
  icon:  LiaUtensilsSolid,
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
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      //validation: Rule => Rule.required(),
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
      name: 'duration',
      title: 'Duration',
      type: 'object',
      fields: [
        {
          name: "hours",
          title: "hours",
          type: "number",
        },
        {
          name: "minutes",
          title: "Minutes",
          type: "number",
          validation: (rule) => rule.max(60),
        },
      ],
      options: {
        columns: 2,
      },
      description: 'Shows the duration for the recipie',
      group: 'pageContent',
     
      // validation: (rule) => rule.required().max(252)
    }),
    defineField({
      name: 'serves',
      title: 'Serves',
      type: 'object',
      fields: [
        {
          name: "serves",
          title: "Serves",
          type: "number",
        },
      ],
      options: {
        columns: 2,
      },
      description: 'How many does this recipies serve',
      group: 'pageContent',
     
      // validation: (rule) => rule.required().max(252)
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'pageContent',
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: 'reference',
          to: [
            { type: 'recipies' },
          ]
        },
        {
          title: "Ingredient",
          type: "object",
          fields: [
            {
              title: "Ingredient",
              name: "ingredient",
              type: "reference",
              to: [{ type: "ingredients" }],
            },
            {
              name: "wholeNumber",
              title: "Whole Numbers",
              type: "number",
            },
            {
              name: "fraction",
              title: "Fraction Amount",
              type: "string",
              options: {
                list: ["1/2", "1/3", "1/4", "3/4", "2/3"],
              },
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                list: ["grams", "cup", "Tbsp.", "tsp.", "bunch"],
              },
            },
            {
              name: "preparation",
              title: "Preparation",
              type: "string",
              options: {
                list: ["Roughly Chopped", "Chopped", "Finely Chopped", "Shredded", "Crushed", "Drained & Rinsed", "Drained & Finely Chopped", "Juice of"],
              },
            },
          ],
          preview: {
            select: {
              title: "ingredient.title",
              name: "ingredient.title",
              media: "ingredient.image",
              wholeNumber: "wholeNumber",
              fraction: "fraction",
              unit: "unit",
              preparation: "preparation",
            },
            prepare({
              title,
              subtitle,
              media,
              wholeNumber,
              fraction,
              unit,
              preparation,
            }) {
              return {
                title,
                subtitle: `${wholeNumber ? wholeNumber : ''} ${fraction ? fraction : ''} ${unit ? unit : ''} - ${preparation ? preparation: ''} `,
                media,
                icon:  LiaCarrotSolid, 
              };
            },
          },
        },
      ],
      group: 'pageContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
      group: 'pageContent',
    }),
    defineField({
      name: 'instructions',
      type: 'array',
      title: 'Instructions',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
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
              type: 'textColor',
            }
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
        {type: headerSectionType.name},
        {type: testimonialSectionType.name},
        {type: teamSectionType.name},
        {type: recipiesSectionType.name},
        {type: videoSectionType.name},
        {type: featuresListSectionType.name},
        {type: ctaSectionType.name},
        {type: newsletterSectionType.name},
        {type: imageCarouselSectionType.name},
        {type: blogSectionType.name},
        {type: stepSectionType.name},
        {type: timelineSectionType.name},
        {type: locationSectionType.name},
        {type: contactSectionType.name},
        {type: clientLoginSectionType.name},
        // etc...
      ],
      group: 'pageContent',
    }),

    defineField({
      name: 'category',
      title: 'Recipie Category',
      type: 'reference',
      to: [{ type: recipieCategoryType.name }],
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


