import { defineField, defineType } from 'sanity'
import { MdOutlineQuestionAnswer } from "react-icons/md"

export default defineType({
  name: "accordionTile",
  type: "object",
  title: "Accordion Tile",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),

    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{ 
        type: 'block',
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'}
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Underline', value: 'underline'}
          ]
        }
      }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: `${title ? title : 'No Title'}`,
        subtitle: `Accordion Tile`,
        icon: MdOutlineQuestionAnswer
      }
    }
  },
})