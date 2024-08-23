import { defineField, defineType } from 'sanity'
import {LiaMap} from "react-icons/lia"

export default defineType({
  name: "locationSection",
  type: "object",
  title: "Location Section",
  fields: [
    defineField({
      title: 'Subitle',
      name: 'subtitle',
      type: 'string',
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
    // defineField({
    //   title: 'Locations',
    //   name: 'locations',
    //   type: 'array',
    //   of: [{type: 'featuresTile'}]
    // }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'flex-start' },
          { title: 'Center', value: 'center' }
        ], // &lt;-- predefined values
      },
    }),
    
  
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
        subtitle: `Location Section`,
        // media: media,
        icon: LiaMap
      }
    }
  },
})