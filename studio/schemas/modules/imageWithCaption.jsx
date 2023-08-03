import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import sizes from '../sizes'

export default defineType({
  name: "imageWithCaption",
  type: "object",
  title: "Image, Caption Module",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
    }),
    defineField({
      title: 'Image Size',
      name: 'imageSize',
      type: 'string',
      options: {
        list: [
          ...sizes
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Make Portrait',
        name: 'portrait',
        type: 'boolean',
        initialValue: false,
    }),    
  ],
  preview: {
    select: {
      title: 'image',
      subtitle: 'imageSize',
    },
    prepare(selection) {
      const {title, subtitle } = selection
      return {
        title: `${title.alt}`,
        subtitle: `Image Size ${subtitle} | Module: Image, Caption Module`,
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})