import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"
import sizes from '../sizes'
import moduleSpacing from '../moduleSpacingSizes'

export default defineType({
  name: "imageWithCaption",
  type: "object",
  title: "Image w/caption Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      image: 'image'
    },
    prepare(selection) {
      const {title, subtitle, image} = selection
      return {
        title: `Image with caption module`,
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
    defineField({
      name: 'moduleSpacing',
      type: 'moduleSpacing',
      title: 'Change the space between modules',
      description: 'Some modules require different space between them. You can independently set the top and bottom space.'
    }),
    

    
    
  ]
})