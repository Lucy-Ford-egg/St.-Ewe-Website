import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import sizes from '../sizes'

export default defineType({
  name: "imageWithCaption",
  type: "object",
  title: "Image, Caption Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      image: 'image'
    },
    prepare(selection) {
      const {title, subtitle, image} = selection
      return {
        title: `Image, Caption Module`,
        subtitle: `Image Size ${subtitle} - ${image.alt}`,
        icon: MdOutlinePhotoSizeSelectActual
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
  ]
})