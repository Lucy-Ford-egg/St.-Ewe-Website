import { defineField, defineType } from 'sanity'
import { MdCenterFocusWeak } from "react-icons/md"

export default defineType({
  name: "imageTextCallToActionImage",
  type: "object",
  title: "Image, Text, Image, CTA Module - Advert Compatible",
  description: "Useful for adverts. The ad logo can be used in the logo field with text below. Or this same component can be used as a non-ad module by not clicking the 'Is Advert' feild.",
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Advert Logo',
      description: 'If the ad client has a logo then pop it in here.',
    }),
    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{
        type: 'block',
        lists: [], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
        ],
        marks: {
          decorators: [],
          annotations: []
        }
      }],
      validation: Rule => Rule.required(),
    }),
     defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
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
      title: 'text',
      subtitle: 'isAdvert',
      media: 'image'

    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title:  subtitle ? "Marked as Advert" : "Not Marked as Advert",
        subtitle: `Module: Image, Text, Image, CTA.`,
        media:media,
        icon: MdCenterFocusWeak
      }
    }
  },
})