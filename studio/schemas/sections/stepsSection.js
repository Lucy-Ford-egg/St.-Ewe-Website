import { defineField, defineType } from 'sanity'
import { LiaListOlSolid  } from "react-icons/lia"

export default defineType({
  name: "stepsSection",
  type: "object",
  title: "Steps Section",
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
    defineField({
      title: 'Tile Colour',
      name: 'tileColor',
      type: 'simplerColor',
    }),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        { type: 'stepTile'},
        { type: 'stepDivider'},
        { type: 'accordionTile'}
      ],
      validation: (Rule) => Rule.custom((parentDepartment, context) => {
        return (
        context.document.isSubDepartment && parentDepartment === undefined ? "Parent department required for sub-departments" : true
     
       ) }
        
        )
    }),

  ],
  preview: {
    select: {
      steps: 'steps',
    },
    prepare(selection) {
      const { steps } = selection
      return {
        title: `${steps.length} - Steps`,
        subtitle: `Steps Section`,
        // media: media,
        icon: LiaListOlSolid 
      }
    }
  },
})