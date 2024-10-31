import {defineField, defineType} from 'sanity'
import {LiaLinkSolid} from 'react-icons/lia'

export default defineType({
  name: 'linkLabelBasic',
  type: 'object',
  title: 'Link',
  icon: LiaLinkSolid,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Navigation Label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
  ],
})
