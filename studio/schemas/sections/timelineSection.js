import { defineField, defineType } from 'sanity'
import { MdAccessTime } from "react-icons/md"

export default defineType({
  name: "timelineSection",
  type: "object",
  title: "Timeline Section",
  fields: [
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      //validation: (rule) => rule.required(),

    }),
    defineField({
      title: 'Title',
      name: 'title',
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
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
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
      title: 'Left Text',
      name: 'leftText',
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
      title: 'Right Text',
      name: 'rightText',
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
      title: 'Timeline Colour',
      name: 'timelineColor',
      type: 'simplerColor',
    }),
    defineField({
      name: 'steps',
      title: 'Time Events',
      type: 'array',
      of: [
        { type: 'timeTile'},
      ]
    }),

  ],
  preview: {
    select: {
      steps: 'steps',
    },
    prepare(selection) {
      const { steps } = selection
      return {
        title: `${steps.length} - Events`,
        subtitle: `Timeline Section`,
        // media: media,
        icon: MdAccessTime
      }
    }
  },
})