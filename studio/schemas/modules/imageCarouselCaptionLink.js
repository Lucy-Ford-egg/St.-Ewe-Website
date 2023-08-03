import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoLibrary} from "react-icons/md"

export default defineType({
  name: "imageCarouselCaptionLink",
  type: "object",
  title: "Image Carousel, Caption, Link Module",
  fields: [
    defineField({
      name: 'carousel',
      title: 'Carousel Images',
      type: 'array',
      of: [{ 
        type: 'imageCaption', 
        options: {
          hotspot: true,
        },
      }],
    }),
    defineField({
      title: 'Link',
      name: 'carouselLinkGroup',
      type: 'linkGroup',
      // validation: Rule => Rule.uri({
      //   scheme: ['http', 'https', 'mailto', 'tel']
      // })
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `First Image: ${subtitle[0].alt}`,
        subtitle: `Number of images: ${subtitle.length} | Module: Image Carousel, Caption, Link Module`,
        icon: MdOutlinePhotoLibrary
      }
    }
  },
})