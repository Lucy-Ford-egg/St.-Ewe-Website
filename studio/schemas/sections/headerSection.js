import { defineField, defineType } from 'sanity'
import { MdOutlinePhotoSizeSelectActual, MdBorderColor } from "react-icons/md"

export default defineType({
  name: "headerSection",
  type: "object",
  title: "Header Section",
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          styles: [
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
          ],
          marks: {
            annotations: [
              {
                type: 'textColor',
              }
            ],
            decorators: [],
          }
        }
      ],
      description: 'Add some textual content. Optional'
    }),
    defineField({
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'flex-start' },
          { title: 'Center', value: 'center' }
        ], // &lt;-- predefined values
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Lead', value: 'body2' },
          ],
          lists: [],
          marks: {
            annotations: [
              {
                type: 'textColor',
              }
            ],
            decorators: [
              { title: 'Strong', value: 'strong' },
            ],
          }
        }
      ],
      description: 'Add some textual content. Optional'
    }),

    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [
        {type: 'linkDefined'}
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
    }),

  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection

      
      
      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Header Section`,
        media: media,
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})