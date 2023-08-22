import { defineField, defineType } from 'sanity'
import {MdViewCarousel} from "react-icons/md"

export default defineType({
  name: "imageCarouselSubtitleTitleTextLink",
  type: "object",
  title: "Hero Image Carousel, Subtitle, Title, Text, CTA Module",
  fields: [
    defineField({
      name: 'carousel',
      title: 'Carousel Images',
      type: 'array',
      of: [{ 
        type: 'heroSlide', 
        options: {
          hotspot: true,
        },
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel',
      media: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      debugger

      return {
        title: `Number of images: ${subtitle.length}`,
        subtitle:  `Module: Hero Image Carousel, Subtitle, Title, Text, CTA`,
        media: media[0].image,
        icon: MdViewCarousel,
      }
    }
  },
})