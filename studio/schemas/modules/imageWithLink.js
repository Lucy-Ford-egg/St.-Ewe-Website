import { defineField, defineType } from 'sanity'
import {MdOutlineImage} from "react-icons/md"

export default defineType({
  name: "imageWithLink",
  type: "object",
  title: "Image w/link Module",
  description: "Similar to the image with caption module but has a link. Checkbox to denote advert.",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      image: 'image'
    },
    prepare(selection) {
      const {isAdvert} = selection
      return {
        title: `Linked Image Module - Advert Compatible - Advert Compatible`,
        subtitle: `${isAdvert === true ? "Advert" : "Non Advert"}`,
        icon: MdOutlineImage
      }
    }
  },
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
  ]
})