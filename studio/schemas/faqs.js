import { LiaQuestionCircle } from "react-icons/lia";
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqs',
  title: `FAQ's`,
  icon: LiaQuestionCircle,
  type: 'document',
  fields: [
   
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      descrition: '',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'array',
      title: 'Answer',
      of: [{ 
        type: 'block',
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'}
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          // { title: 'Heading 4', value: 'h4' },
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),   
  ],
  preview: {
    select: {
      title: 'question',
      date: 'date',
    },
    prepare({ title, date }) {
      const subtitles = [
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, subtitle: subtitles.join(' ') }
    },
  },
})