import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import sizes from '../sizes'

export default defineType({
  name: "headerSectionAccommodationSearch",
  type: "object",
  title: "Header Section w/Accommodation Search",
  fields: [
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
      name: 'searchColour',
      type: 'reference',
      title: 'Search Background Colour',
      initialValue: '#DCE5E1', 
      to:[{type: 'designSystemColor'}]
    }), 
    
    defineField({
      name: 'showSearch',
      type: 'boolean',
      title: 'Show Search',
      initialValue: true, 
    }),
      
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),   
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: `${title}`,
        subtitle: `Header Section w/Accommodation Search`,
        media: media,
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})