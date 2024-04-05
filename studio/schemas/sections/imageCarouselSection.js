import { defineField, defineType } from 'sanity'
import { MdViewModule } from "react-icons/md"

export default defineType({
  name: "imageCarouselSection",
  type: "object",
  title: "Image Carousel Section",
  fields: [
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{
        type: 'image', options: {
          hotspot: true,
        },
      }]
    })

  ],
  preview: {
    select: {
      title: 'title',
      textAlign: 'textAlign',
      media: 'images'

    },
    prepare(selection) {
      const { title, media, showSearch, textAlign } = selection
      return {
        title: title,
        subtitle: `Image Carousel Section`,
        media: media[0],
        icon: MdViewModule
      }
    }
  },
})