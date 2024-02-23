import { defineField, defineType } from 'sanity'
import {MdViewModule} from "react-icons/md"

export default defineType({
  name: "featuresListSection",
  type: "object",
  title: "Features List Section",
  fields: [
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
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Tiles',
      name: 'featuresTile',
      type: 'array',
      of: [{type: 'featuresTile'}]
    })
  
  ],
  preview: {
    select: {
      title: 'title',
      textAlign: 'textAlign'

    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Features List Section`,
        // media: media,
        icon: MdViewModule
      }
    }
  },
})