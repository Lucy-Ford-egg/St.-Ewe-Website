import { defineField, defineType } from 'sanity'
import {LiaMailchimp} from "react-icons/lia"

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
      title: 'Title',
      name: 'title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          // { title: 'Bullet', value: 'bullet' },
          // { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Lead', value: 'body2' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          annotations: [
            {
              type: 'textColor',
            }
          ],
          decorators: [
            // { title: 'Strong', value: 'strong' },
            // { title: 'Emphasis', value: 'em' },
            // { title: 'Underline', value: 'underline' },
          ]
        }
      }
      ],
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Lead', value: 'body2' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }
      ],
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'mirror',
      type: 'boolean',
      title: 'Mirror',
      description: 'Select this to reverse the order. Image positioned on the left'
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
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Newsletter Section`,
        media: media,
        icon: LiaMailchimp
      }
    }
  },
})