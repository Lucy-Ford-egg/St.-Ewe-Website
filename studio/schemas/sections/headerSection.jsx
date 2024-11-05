import {defineField, defineType} from 'sanity'
import {LiaImage, LiaBorderStyleSolid} from 'react-icons/lia'

export default defineType({
  name: 'headerSection',
  type: 'object',
  title: 'Header Section',
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
      name: 'alignment',
      type: 'textAlign',
      title: 'Alignment',
      description: 'Aligns text to the grid. If unset defaults to center',
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
            {title: 'Lead', value: 'body2'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                type: 'textColor',
              },
            ],
          },
        },
        {
          type: 'image',
          // validation: (rule) => rule.required(),
        },
      ],
      description: 'Add some textual content. Optional',
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
  ],
  preview: {
    select: {
      title: 'text',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Header Section`,
        media: media,
        icon: LiaImage,
      }
    },
  },
})
