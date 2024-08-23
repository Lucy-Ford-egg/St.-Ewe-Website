import { defineField, defineType } from 'sanity'
import {LiaImage} from "react-icons/lia"

export default defineType({
  name: "benifitsSection",
  type: "object",
  title: "Benefits Section",
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'icons',
      title: 'Icon',
    }),  
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      hidden: ({ parent, value }) => !value && parent?.icon
    }),
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
      description: 'Add some textual content. Optional'
    }),
    defineField({
      name: 'subItem',
      type: 'array',
      title: 'SubItem(s)',
      of: [
        {type: 'subItem'}
      ],
      description: 'Add sub items. Optional',
      validation: Rule => Rule.min(1).max(4),
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
      name: 'mirror',
      type: 'boolean',
      title: 'Image positioned on the right',
      description: 'Select this to reverse the order to have Image on the right and text on the right.'
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'highlighted',
      type: 'boolean',
      title: 'Make the section highlighted',
      description: 'Adds a background colour to green and a pin-line border. Optional'
    })   
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      showSearch: 'showSearch',
      highlighted: 'highlighted'
    },
    prepare(selection) {
      const { title, media, showSearch, highlighted } = selection

      const thumb = highlighted ? <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',backgroundColor: '#698F68'}}>{<LiaImage style={{color: 'white'}}/>}</span> : media

      return {
        title: title,
        subtitle: `Benefits Section`,
        // media: media,
        media: thumb,
        icon: LiaImage
      }
    }
  },
})