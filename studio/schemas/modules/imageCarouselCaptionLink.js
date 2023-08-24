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
      media: 'carousel'
    },
    prepare(selection) {
      const { media} = selection
      return {
        title: `Number of images: ${media.length}`,
        subtitle: `Module: Image Carousel, Caption, Link`,
        media: media[0].asset,
        icon: MdOutlinePhotoLibrary
      }
    }
  },
})