import {defineType, defineField} from 'sanity'
import {LiaFilePdfSolid} from 'react-icons/lia'

export default defineType({
  name: 'hotspotItem',
  type: 'object',
  fieldsets: [{name: 'position', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      //validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [{type: 'linkDefined'}],
      description: 'Add a link(s). Optional',
      validation: (Rule) => Rule.min(1).max(2),
    }),
    defineField({
      name: 'x',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'y',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      x: 'x',
      y: 'y',
    },
    prepare({title, x, y}) {
      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
      }
    },
  },
})
