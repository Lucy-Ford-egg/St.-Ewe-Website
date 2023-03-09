import { defineField, defineType } from 'sanity'
import {SiInstagram} from "react-icons/si"

export default defineType({
  name: "instagramEmbed",
  type: "object",
  title: "Instagram Embed Module",
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title } = selection
      return {
        title: `Instagram Embed Module`,
        icon: SiInstagram
      }
    }
  },
  fields: [
    defineField({
      name: 'instagramUrl',
      type: 'instagramUrl',
      title: 'Instagram Url'
    })
  ]
})