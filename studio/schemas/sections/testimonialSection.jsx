import {defineField, defineType} from 'sanity'
import {LiaQuoteLeftSolid} from 'react-icons/lia'

export default defineType({
  name: 'testimonialSection',
  type: 'object',
  title: 'Testimonial Section',
  fields: [
    defineField({
      name: 'leftAsset',
      title: 'Left Asset (optional)',
      type: 'image',
    }),
    defineField({
      name: 'rightAsset',
      title: 'Right Asset (optional)',
      type: 'image',
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
    }),
    defineField({
      name: 'testimonialTile',
      type: 'reference',
      to: [{type: 'quote', title: 'Quotes'}],
    }),
  ],
  preview: {
    select: {
      testimonialTile: 'testimonialTile',
    },
    prepare(selection) {
      const {testimonialTile} = selection
      return {
        title: `Testimonial`,
        subtitle: `Testimonial Section`,
        // media: media,
        icon: LiaQuoteLeftSolid,
      }
    },
  },
})
