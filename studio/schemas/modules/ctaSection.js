import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"

export default defineType({
  name: "ctaSection",
  type: "object",
  title: "CTA Section",
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }), 
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content. Optional'
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [
        {type: 'linkDefined'}
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
    }),
    defineField({
      name: 'leftAlign',
      type: 'boolean',
      title: 'Image positioned on the right',
      description: 'Select this align the text to the left and show the image full in the background with a pin line border. Optional'
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'overlay',
      type: 'overlay',
      title: 'Add an overlay to the image. Allows the text to pop off lighter images.',
    }), 
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      leftAlign: 'leftAlign',
    },
    prepare(selection) {
      const { title, media, leftAlign, } = selection

      return {
        title: title,
        subtitle: `CTA Section ${leftAlign && 'Left Aligned text version'}`,
        media: media,
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})