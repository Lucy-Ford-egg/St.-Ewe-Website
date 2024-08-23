import { defineField, defineType } from 'sanity'
import {LiaBuromobelexperte} from "react-icons/lia"

export default defineType({
  name: "featuresTile",
  type: "object",
  title: "Features Tile",
  fields: [ 
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
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
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          // { title: 'Lead', value: 'body2' },
          // { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          annotations: [
            {
              type: 'textColor',
            }
          ],
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }
      ],
      description: 'Optional Text'
    }),
    defineField({
      name: 'link',
      type: 'linkDefined',
      title: 'Link',
      description: 'Add a link. Optional'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare(selection) {
      const { title, media } = selection
      
      return {
        title: title,
        subtitle: `Features Tile`,
        media: media,
        icon: LiaBuromobelexperte
      }
    }
  },
})