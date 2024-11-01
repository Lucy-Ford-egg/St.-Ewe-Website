import {defineField, defineType} from 'sanity'
import {LiaMaleSolid} from 'react-icons/lia'

export default defineType({
  name: 'teamSection',
  type: 'object',
  title: 'Team Section',
  fields: [
    defineField({
      name: 'teamTiles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'teamMember', title: 'Team Members'}],
        },
      ],
    }),
    defineField({
      title: 'Tile Colour',
      name: 'tileColour',
      type: 'simplerColor',
      description: 'Add a background colour',
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
      teamTiles: 'teamTiles',
    },
    prepare(selection) {
      const {teamTiles} = selection
      return {
        title: `${teamTiles ? teamTiles?.length : 0} - Team Members`,
        subtitle: `Team Section`,
        // media: media,
        icon: LiaMaleSolid,
      }
    },
  },
})
