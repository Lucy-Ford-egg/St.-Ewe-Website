import { defineField, defineType } from 'sanity'
import {MdViewCarousel} from "react-icons/md"

export default defineType({
  name: "imageCarouselSubtitleTitleTextLink",
  type: "object",
  title: "Hero Image Carousel, Subtitle, Title, Text, CTA Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero Image Carousel, Subtitle, Title, Text, CTA Module`,
        subtitle: `Number of images: ${subtitle.length}`,
        icon: MdViewCarousel
      }
    }
  },
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
  ]
})