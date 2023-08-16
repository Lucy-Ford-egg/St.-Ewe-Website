import { defineField, defineType } from 'sanity'
import {SiInstagram} from "react-icons/si"

export default defineType({
  name: "instagramModule",
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
      name: 'title',
      type: 'string',
      title: 'Instagram Handle',
      description: 'Copy the "thejeffersondc" section from the url example: https://www.instagram.com/thejeffersondc/. Do not include the @, that is added programmatically'
    }),
    defineField({
      name: 'instagramEmbeds',
      type: 'instagramEmbeds',
      title: 'Instagram Embed List',
     
    }),
  ]
})

