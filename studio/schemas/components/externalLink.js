import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'externalLink',
  type: 'object',
  title: 'External link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Link Label'
    }),
    defineField({
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean'
    })
  ]
})