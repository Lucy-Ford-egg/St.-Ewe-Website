import { defineField, defineType } from 'sanity'
import {LiaGripHorizontalSolid} from "react-icons/lia"

export default defineType({
  name: "servicesSection",
  type: "object",
  title: "Sevices Section",
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
      name: 'servicesTile',
      type: 'array',
      of: [{type: 'servicesTile'}]
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
        subtitle: `Sevices Section | Text align ${textAlign}`,
        // media: media,
        icon: LiaGripHorizontalSolid
      }
    }
  },
})