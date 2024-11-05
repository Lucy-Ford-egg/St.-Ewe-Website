import {defineField, defineType} from 'sanity'
import {LiaImage} from 'react-icons/lia'

export default defineType({
  name: 'hotspotSection',
  type: 'object',
  title: 'Hotspot Section',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'hotspotData',
      type: 'reference',
      to: [{type: 'hotspots', title: 'Add your hotspot collection'}],
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title ? title : 'Title',
        subtitle: `Hotspot Section`,
        media: media,
        icon: LiaImage,
      }
    },
  },
})
