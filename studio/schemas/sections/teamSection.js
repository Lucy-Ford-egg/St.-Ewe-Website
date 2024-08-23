import { defineField, defineType } from 'sanity'
import {LiaMaleSolid} from "react-icons/lia"

export default defineType({
  name: "teamSection",
  type: "object",
  title: "Team Section",
  fields: [
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      //validation: (rule) => rule.required(),
      
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          //{ title: 'Bullet', value: 'bullet' },
          //{ title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          
        ],
        marks: {
          decorators: [
            //{ title: 'Strong', value: 'strong' },
            //{ title: 'Emphasis', value: 'em' },
            //{ title: 'Underline', value: 'underline' },
          ]
        }
      }
    ],
    }),
    defineField({
      name: 'leftText',
      title: 'Left Text',
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
      name: 'rightText',
      title: 'Right Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
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
      }, {
        type: 'image'
      }],
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
    defineField({
      title: 'Tile Colour',
      name: 'tileColor',
      type: 'simplerColor',
    }),
    defineField({
      name: 'teamTiles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember', title: 'Team Members' }],
        }
      ]
    }),
  
  ],
  preview: {
    select: {
      teamTiles: 'teamTiles',
    },
    prepare(selection) {
      const { teamTiles } = selection
      return {
        title: `${teamTiles ? teamTiles?.length : 0 } - Team Members`,
        subtitle: `Team Section`,
        // media: media,
        icon: LiaMaleSolid
      }
    }
  },
})