import {LiaQuoteLeftSolid} from 'react-icons/lia'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  icon: LiaQuoteLeftSolid,
  type: 'document',
  groups: [
    {
      name: 'pageContent',
      title: 'Page Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            // { title: 'Lead', value: 'body2' },
          ],
          lists: [],
          marks: {
            annotations: [
              //{type: 'textColor',}
            ],
            decorators: [
              //{ title: 'Strong', value: 'strong' },
            ],
          },
        },
      ],
      description:
        'Add your quote. We got a max character count on this so they don`t get too long.',
      validation: (Rule) => Rule.required().max(260),
    }),

    defineField({
      name: 'cite',
      title: 'Person',
      type: 'externalCite',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {title}
    },
  },
})
