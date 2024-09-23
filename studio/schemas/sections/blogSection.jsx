import { defineField, defineType } from 'sanity'
import {LiaImage} from "react-icons/lia"

export default defineType({
  name: "blogSection",
  type: "object",
  title: "Blog Section",
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      //validation: (rule) => rule.required(),
      
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          //{ title: 'Bullet', value: 'bullet' },
          //{ title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          
        ],
        marks: {
          decorators: [
            //{ title: 'Strong', value: 'strong' },
            //{ title: 'Emphasis', value: 'em' },
            //{ title: 'Underline', value: 'underline' },
          ]
        }
      }
    ],
    }),
    defineField({
      name: 'leftText',
      title: 'Left Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Lead', value: 'body2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
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
      name: 'rightText',
      title: 'Right Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }],
    }),
    defineField({
      name: 'showArchive',
      type: 'showArchive',
      title: 'Show Archive',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
  }),
  defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
  }), 
  ],
  preview: {
    select: {
      showArchive: 'showArchive'
    },
    prepare(selection) {
      const { showArchive } = selection

      return {
        title: showArchive.setArchive === true ? 'Displaying All Posts' : 'By Category',
        subtitle: `Blog Section`,
        // media: media,
        icon: LiaImage
      }
    }
  },
})