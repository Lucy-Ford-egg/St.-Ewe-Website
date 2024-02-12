import { defineField, defineType } from 'sanity'
import {MdOndemandVideo} from "react-icons/md"

export default defineType({
  name: "videoSection",
  type: "object",
  title: "Video Section",
  fields: [
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      name: 'video',
      type: 'videoId',
      title: 'Add a Vimeo Video',
      description: 'Add Vimeo Url',
      validation: Rule => Rule.required(),
    }),  
  ],
  preview: {
    select: {
      video: 'video'
    },
    prepare(selection) {
      const { title, media, video } = selection
      
      return {
        title: video && `Video Added`,
        subtitle: `Video Section`,
        media: media,
        icon: MdOndemandVideo
      }
    }
  },
})