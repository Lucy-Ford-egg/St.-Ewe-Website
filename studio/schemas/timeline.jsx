import {LiaCalendarDaySolid, LiaFilePdfSolid} from 'react-icons/lia'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  icon: LiaCalendarDaySolid,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ], // yes please, both bullet and numbered
          styles: [
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Subtitle', value: 'overline'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {type: 'textColor'},
              {type: 'textColumns'},
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      {type: 'post'},
                      {type: 'page'},
                      {type: 'recipes'},
                      // other types you may want to link to
                    ],
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
              {type: 'file', icon: LiaFilePdfSolid},
              {type: 'textColor'},
              // {type: 'imageOptions'},
            ],
          },
        },
        // {
        //     type: 'image',
        //     validation: (rule) => rule.required(),
        // }
      ],
      validation: (rule) => rule.required(),
      description: 'The editor should allow for most text formatting.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'image',
    },
    prepare({title, media, author, date}) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
