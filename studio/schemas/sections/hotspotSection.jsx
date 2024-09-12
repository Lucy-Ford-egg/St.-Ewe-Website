import { defineField, defineType } from 'sanity'
import { LiaImage, LiaBorderStyleSolid } from "react-icons/lia"


export default defineType({
  name: "hotspotSection",
  type: "object",
  title: "Hotspot Section",
  fields: [
    defineField({ name: 'title', type: 'string' }), 
    defineField({ name: 'image', type: 'image' }), 
    defineField({
        name: 'hotspots',
        type: 'array',
        of: [{type: 'hotspotItem'}],
       
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
        subtitle: `Hotspot Section`,
        media: media,
        icon: LiaImage
      }
    }
  },
})