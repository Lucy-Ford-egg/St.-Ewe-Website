import { defineField, defineType } from 'sanity'
import {MdWebAsset} from "react-icons/md"

export default defineType({
  name: "featuresTile",
  type: "object",
  title: "Features Tile",
  fields: [ 
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }), 
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content.'
    }),
    defineField({
      name: 'link',
      type: 'linkDefined',
      title: 'Link',
      description: 'Add a link. Optional'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare(selection) {
      const { title, media } = selection
      
      return {
        title: title,
        subtitle: `Features Tile`,
        media: media,
        icon: MdWebAsset
      }
    }
  },
})