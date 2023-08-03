import { defineField, defineType } from 'sanity'
import {MdSmartButton} from "react-icons/md"

export default defineType({
  name: "heroCallToAction",
  type: "object",
  title: "Hero Image, Title, Text, Call to Action Module",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text'
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'image',
      
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `${subtitle.alt} | Module: Hero Image, Title, Text, Call to Action Module`,
        icon: MdSmartButton
      }
    }
  },
})