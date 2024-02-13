import { defineField, defineType } from 'sanity'
import { MdViewModule } from "react-icons/md"

export default defineType({
  name: "imageCarouselSection",
  type: "object",
  title: "Image Carousel Section",
  fields: [
    // defineField({
    //   name: 'icon',
    //   type: 'icons',
    //   title: 'Icon',
    // }),
    // defineField({
    //   name: 'subtitle',
    //   type: 'string',
    //   title: 'Subtitle',
    //   hidden: ({ parent, value }) => !value && parent?.icon
    // }),
    // defineField({
    //   name: 'title',
    //   type: 'string',
    //   title: 'Title',
    // }),

    // defineField({
    //   name: 'text',
    //   type: 'text',
    //   rows: 6,
    //   title: 'Text',
    //   description: 'Add some textual content. Optional'
    // }),

    // defineField({
    //   name: 'textAlign',
    //   type: 'textAlign',
    //   title: 'Choose Text Alignment',
    // }),

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