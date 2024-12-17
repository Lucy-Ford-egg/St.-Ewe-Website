import {LiaBriefcaseSolid, LiaFilePdfSolid} from 'react-icons/lia'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'careers',
  title: `Careers`,
  icon: LiaBriefcaseSolid,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'linkLabelBasic',
      title: 'Link',
    }),
    defineField({
      name: 'answer',
      type: 'array',
      title: 'Job Description',
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
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
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
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
              // {type: 'imageOptions'},
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({title, date}) {
      const subtitles = [date && `on ${format(parseISO(date), 'LLL d, yyyy')}`].filter(Boolean)

      return {title: title, subtitle: subtitles.join(' ')}
    },
  },
})
