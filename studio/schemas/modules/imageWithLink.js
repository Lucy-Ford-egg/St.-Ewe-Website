import { defineField, defineType } from 'sanity'
import {LiaImage} from "react-icons/lia"

export default defineType({
  name: "imageWithLink",
  type: "object",
  title: "Linked Image Module - Advert Compatible",
  description: "Similar to the image with caption module but has a link. Checkbox to denote advert.",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      type: 'imageCaption',
      title: 'Mobile Image',
      description: 'Set this and use the Sanity hotspot crop feature to use this image for mobile',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isAdvert',
      type: 'boolean',
      title: 'Show as Advert',
      description: 'By checking this the caption of advert is added to the module to distinguish it as an advert.'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'isAdvert',
      media: 'image'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: subtitle ? "Marked as Advert" : "Not Marked as Advert",
        subtitle: `Module: Linked Image Module`,
        media: media,
        icon: LiaImage
      }
    }
  },
})