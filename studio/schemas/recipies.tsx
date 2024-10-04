import { LiaUtensilsSolid, LiaCarrotSolid,  LiaStopwatchSolid } from "react-icons/lia"
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import authorType from './author'
import recipesCategoryType from './taxonomies/recipesCategory'
import openGraph from './openGraph'
import siteMeta from './siteMeta'
import { pageBuilder } from "./parts/pageBuilder"
// Imported only on the recipe page
import recipeBodySection from "./sections/recipeBodySection"

export default defineType({
  name: 'recipes',
  title: 'Recipe',
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
      name: 'featuredMedia',
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
      //validation: (rule) => rule.required(),
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
      // validation: (rule) => rule.required(),
      group: 'pageContent',
    }),
    defineField({name: 'modified', type: 'datetime', group: 'pageContent'}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'publish'},
          {title: 'Future', value: 'future'},
          {title: 'Draft', value: 'draft'},
          {title: 'Pending', value: 'pending'},
          {title: 'Private', value: 'private'},
          {title: 'Trash', value: 'trash'},
          {title: 'Auto-Draft', value: 'auto-draft'},
          {title: 'Inherit', value: 'inherit'},
        ],
      },
      group: 'pageContent',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      group: 'pageContent',
    }),
    defineField({
      name: 'serves',
      title: 'Serves',
      type: 'serves',
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
      name: 'ingredientsList',
      title: 'Ingredients List',
      type: 'ingredientsList',
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
        // validation: (rule) => rule.required(),
      }],
      // validation: (rule) => rule.required(),
      description: "This works slightly differently to page modules. You can add images, quotes and other textural decoration in the editor.",
      group: 'pageContent',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      description: 'Build out the structure of the page sections by clicking add item and selecting the module which best suits the type of content you wish to add.',
      of: [...pageBuilder, { type: recipeBodySection.name}],
      group: 'pageContent',
    }),

    defineField({
      name: 'category',
      title: 'Recipe Category',
      type: 'reference',
      to: [{ type: recipesCategoryType.name }],
      group: 'pageContent',
      //validation: (rule) => rule.required(),
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


