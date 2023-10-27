import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"

export default defineType({
  name: "featureSection",
  type: "object",
  title: "Feature Section",
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
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
      name: 'mirror',
      type: 'boolean',
      title: 'Image positioned on the right',
      description: 'Select this to reverse the order to have Image on the right and text on the right.'
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
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
      showSearch: 'showSearch'
    },
    prepare(selection) {
      const { title, media, showSearch } = selection
      return {
        title: `${title}`,
        subtitle: `Feature Section`,
        media: media,
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})