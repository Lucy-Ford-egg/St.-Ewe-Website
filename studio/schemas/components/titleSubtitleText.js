import { defineField, defineType } from 'sanity'
import {MdShortText} from "react-icons/md"

export default defineType({
  name: "titleSubtitleText",
  type: "object",
  title: "Title, Subtitle, Text Module",
  fields: [
    defineField({
      name: 'displayTitle',
      type: 'array',
      title: 'Display Title',
      of: [{ 
        type: 'block',
        lists: [], // yes please, both bullet and numbered
        styles: [
          { title: 'Normal', value: 'h2'},
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
        ],
        marks: {
          decorators: [],
          annotations: []
        }
      }],
      description: "Sometimes titles look better being broken onto 2 lines. Use a soft return (shift + return) in the position of the string of text to achieve this.",   
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Leave empty to pull in categories linked to the that page or over-ride by adding content. For place pages it will be populated with the loaction. For Posts it will be populated with the categories.'
    }),
    defineField({
      name: 'subtitlePosition',
      type: 'boolean',
      title: 'Subtitle Below Title',
      description: 'Set this to display the subtitle below the title'
    }),
    defineField({
      name: 'showAdornment',
      type: 'boolean',
      title: 'Icon and line separator',
      description: 'Set this to display an icon with the separating lines.'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content. Optional'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      // subtitle: 'imageSize',
      
    },
    prepare(selection) {
      const {displayTitle, subtitle} = selection
      return {
        title: `Title, Subtitle, Text Module`,
        subtitle: displayTitle,
        icon: MdShortText
      }
    }
  },
})