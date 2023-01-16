import { defineField, defineType } from 'sanity'

export default defineType({
  name: "linkGroup",
  type: "object",
  title: "Link",
  fields: [
    defineField({
        name: 'link',
        type: 'object',
        title: 'External link',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL'
          },
          {
            title: 'Open in new tab',
            name: 'blank',
            description: 'Read https://css-tricks.com/use-target_blank/',
            type: 'boolean'
          }
        ]
    }),
    defineField({
      name: 'internalLink',
        type: 'object',
        title: 'Internal link',
        fields: [
          {
            name: 'reference',
            type: 'reference',
            title: 'Reference',
            to: [
              { type: 'places' },
              { type: 'news' },
              // other types you may want to link to
            ]
          }
        ]
    }),
  ]
})