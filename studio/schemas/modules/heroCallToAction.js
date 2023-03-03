import { defineField, defineType } from 'sanity'
import {MdSmartButton} from "react-icons/md"

export default defineType({
  name: "heroCallToAction",
  type: "object",
  title: "Hero Image, Title, Text, Call to Action Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero Call to Action Module`,
        subtitle: title,
        icon: MdSmartButton
      }
    }
  },
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
  ]
})