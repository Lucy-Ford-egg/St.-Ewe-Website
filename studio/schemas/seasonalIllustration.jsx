import {LiaUtensilsSolid, LiaCarrotSolid, LiaStopwatchSolid} from 'react-icons/lia'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'
import authorType from './author'
import recipesCategoryType from './taxonomies/recipesCategory'

import {pageBuilder} from './parts/pageBuilder'
// Imported only on the recipe page
import recipeBodySection from './sections/recipeBodySection'

export default defineType({
  name: 'seasonalIllustrations',
  title: 'Seasonal Illustrations',
  icon: LiaUtensilsSolid,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'layers',
      type: 'array',
      title: 'Layers',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          //validation: Rule => Rule.required(),
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, author, date}) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
