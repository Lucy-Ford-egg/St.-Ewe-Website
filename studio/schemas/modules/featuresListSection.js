import { defineField, defineType } from 'sanity'
import {MdViewModule} from "react-icons/md"

export default defineType({
  name: "featuresListSection",
  type: "object",
  title: "Features List Section",
  fields: [
    defineField({
      name: 'icon',
      type: 'icons',
      title: 'Icon',
    }), 
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      hidden: ({ parent, value }) => !value && parent?.icon
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }), 

    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content. Optional'
    }),
    
    defineField({
      name: 'textAlign',
      type: 'textAlign',
      title: 'Choose Text Alignment',
    }), 

    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Tiles',
      name: 'featuresTile',
      type: 'array',
      of: [{type: 'featuresTile'}]
    })
  
  ],
  preview: {
    select: {
      title: 'title',
      textAlign: 'textAlign'

    },
    prepare(selection) {
      const { title, media, showSearch, textAlign } = selection
      return {
        title: `${title} ${showSearch && '| Search active'}`,
        subtitle: `Features List Section | Text align ${textAlign}`,
        // media: media,
        icon: MdViewModule
      }
    }
  },
})