import { defineField, defineType } from 'sanity'
import {MdViewCarousel} from "react-icons/md"

export default defineType({
  name: "imageCarouselSubtitleTitleTextLink",
  type: "object",
  title: "Hero image carousel w/subtitle, title, text & link module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero image carousel w/subtitle, title, text & link module`,
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