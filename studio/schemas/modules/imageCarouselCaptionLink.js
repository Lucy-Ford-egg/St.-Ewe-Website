import { defineField, defineType } from 'sanity'

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
  ]
})