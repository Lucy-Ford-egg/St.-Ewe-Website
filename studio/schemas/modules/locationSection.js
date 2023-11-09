import { defineField, defineType } from 'sanity'
import {MdMap} from "react-icons/md"

export default defineType({
  name: "locationSection",
  type: "object",
  title: "Location Section",
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
      title: 'Geo Point',
      name: 'geopoint',
      type: 'geopoint',
    })
  
  ],
  preview: {
    select: {
      title: 'title',
      textAlign: 'textAlign',
      media: 'images'

    },
    prepare(selection) {
      const { title, media, textAlign } = selection
      return {
        title: `${title ? title : 'No Title' }`,
        subtitle: `Location Section | Text align ${textAlign}`,
        icon: MdMap
      }
    }
  },
})