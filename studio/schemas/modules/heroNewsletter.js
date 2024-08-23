import { defineField, defineType } from 'sanity'
import {LiaMailBulkSolid } from "react-icons/lia"

export default defineType({
  name: "heroNewsletter",
  type: "object",
  title: "Hero Newsletter, CTA, Caption Module",
  description: "This module requires activation to work. Check the box below. Users fill in their email on the frontend and the data is set to the corresponding list within you MailChimp account.",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text'
    }),
    defineField({
      name: 'activate',
      type: 'boolean',
      title: 'Activate Module',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'image',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title ? title : "Empty Title",
        subtitle: `Module: Hero Newsletter, CTA, Caption Module`,
        media: media,
        icon: LiaMailBulkSolid 
      }
    }
  },
})