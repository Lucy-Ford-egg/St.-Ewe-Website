import { defineField, defineType } from 'sanity'
import {MdCampaign} from "react-icons/md"

export default defineType({
  name: "newsletterSection",
  type: "object",
  title: "Newsletter Section",
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
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
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColor',
      type: 'simplerColor',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const { title, media, } = selection

      return {
        title: title,
        subtitle: `Newsletter Section`,
        media: media,
        icon: MdCampaign
      }
    }
  },
})