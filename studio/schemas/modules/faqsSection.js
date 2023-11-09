import { defineField, defineType } from 'sanity'
import { MdOutlineQuestionAnswer } from "react-icons/md"

export default defineType({
  name: "faqsSection",
  type: "object",
  title: "FAQ Section",
  fields: [
    defineField({
      name: 'icon',
      type: 'icons',
      title: 'Icon',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      hidden: ({ parent, value }) => !value && parent?.icon
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),

    defineField({
      name: 'richText',
      type: 'array',
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
    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [
        {type: 'linkDefined'}
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
    }),
    
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqs', title: 'FAQS' }],
        }
      ]
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'mirror',
      type: 'boolean',
      title: 'FAQS positioned on the left',
      description: 'Select this to reverse the order to have FAQS on the left and text on the right.'
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
        subtitle: `FAQ Section`,
        icon: MdOutlineQuestionAnswer
      }
    }
  },
})