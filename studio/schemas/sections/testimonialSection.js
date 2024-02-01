import { defineField, defineType } from 'sanity'
import {MdFormatQuote} from "react-icons/md"

export default defineType({
  name: "testimonialSection",
  type: "object",
  title: "Testimonial Section",
  fields: [
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColor',
      type: 'simplerColor',
    }),
    defineField({
      name: 'testimonialTiles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quote', title: 'Quotes' }],
        }
      ]
    }),
  
  ],
  preview: {
    select: {
      testimonialTiles: 'testimonialTiles',
    },
    prepare(selection) {
      const { testimonialTiles } = selection
      return {
        title: `${testimonialTiles.length} - Testimonials`,
        subtitle: `Testimonial Section`,
        // media: media,
        icon: MdFormatQuote
      }
    }
  },
})