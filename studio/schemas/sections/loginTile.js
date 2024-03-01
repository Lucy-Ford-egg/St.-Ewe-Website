import { defineField, defineType } from 'sanity'
import {MdWebAsset} from "react-icons/md"

export default defineType({
  name: "loginTile",
  type: "object",
  title: "Login Tile",
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
      title: 'Title',
      name: 'title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Lead', value: 'body2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }
      ],
    }),
    defineField({
      name: 'link',
      type: 'linkDefined',
      title: 'Link',
      description: 'Add a link. Optional'
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
  
      return {
        title: `${ title[0].children[0].text}`,
        subtitle: `Login Tile`,
        icon: MdWebAsset
      }
    }
  },
})