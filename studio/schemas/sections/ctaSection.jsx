import {defineField, defineType} from 'sanity'
import {LiaImage, LiaFilePdfSolid} from 'react-icons/lia'

export default defineType({
  name: 'ctaSection',
  type: 'object',
  title: 'CTA Section',
  fields: [
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
      description: 'The editor should allow for most text formatting.',
    }),
    defineField({
      name: 'asset',
      title: 'Asset (optional)',
      type: 'image',
    }),
    defineField({
      name: 'showForm',
      type: 'boolean',
      title: 'Show newsletter form',
      // description: 'Shift the content to left or right',
    }),
    defineField({
      name: 'alignment',
      type: 'alignment',
      title: 'Alignment',
      description: 'Aligns text to the grid. If unset defaults to center',
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
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
    }),
    defineField({
      name: 'overlay',
      type: 'overlay',
      title: 'Add an overlay to the image. Allows the text to pop off lighter images.',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      media: 'image',
    },
    prepare(selection) {
      const {text, media, leftAlign} = selection

      return {
        title: text ? text[0]?.children[0]?.text : 'No Title',
        subtitle: `CTA Section`,
        media: media,
        icon: LiaImage,
      }
    },
  },
})
