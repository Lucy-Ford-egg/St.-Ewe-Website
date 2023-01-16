import { defineField, defineType } from 'sanity'
import sizes from '../sizes'

export default defineType({
  name: "imageCarouselCaptionLink",
  type: "object",
  title: "Image carousel w/caption & link Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Image carousel w/caption & link module`,
        subtitle: `Number of images: ${subtitle.length}`
      }
    }
  },
  fields: [
    defineField({
      name: 'carousel',
      title: 'Carousel Images',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: {
          hotspot: true,
        },
        fields: [
          defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative text'
          }),
          defineField({
            name: 'caption',
            type: 'string',
            title: 'Caption'
          })
        ] 
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
  ]
})