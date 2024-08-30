import { defineField, defineType } from 'sanity'
import {LiaImage} from "react-icons/lia"

export default defineType({
  name: "borderSection",
  type: "object",
  title: "Border Section",
  fields: [
    defineField({
        title: "Border Type",
        name: "borderType",
        type: "string",
        options: {
          list: ["Type 6"],
        },
      }),
      defineField({
        title: "Border Direction",
        name: "borderDirection",
        type: "string",
        options: {
          list: ["Top", "Bottom"],
        },
      }),
    defineField({
        title: 'Joining Colour',
      name: 'joiningColour',
      type: 'simplerColor',
    }),
    defineField({
        title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add some textual content. Optional'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      
    },
    prepare(selection) {
      const { title, media, } = selection

      return {
        title: title,
        subtitle: `Border Section`,
        media: media,
        icon: LiaImage
      }
    }
  },
})