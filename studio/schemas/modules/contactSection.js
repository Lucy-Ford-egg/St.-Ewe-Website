import { defineField, defineType } from 'sanity'
import {MdMailOutline} from "react-icons/md"

export default defineType({
  name: "contactSection",
  type: "object",
  title: "Contact Section",
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
      name: 'showForm',
      type: 'boolean',
      title: 'Add form',
      description: 'Add a form. Forms are passed to an email address.'
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

      return {
        title: title,
        subtitle: `Contact Section`,
        media: media,
        icon: MdMailOutline
      }
    }
  },
})