import { defineField, defineType } from 'sanity'
import {MdWebStories} from "react-icons/md"

export default defineType({
  name: "postsGrid",
  type: "object",
  title: "Posts Grid module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Posts Grid module`,
        subtitle: ``,
        icon: MdWebStories
      }
    }
  },
  fields: [
    defineField({
      name: 'gridTitleSubtitleText',
      type: 'titleSubtitleText',
      title: 'Add a Title, subtitle, text' 
    }),
    defineField({
      name: 'posts',
      title: 'Add Posts',
      type: 'array',
      description: 'Leave empty to show the latest posts or add specific post to a grid.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
     ],
     // validation: Rule => Rule.required().min(2)
    }),
  ]
})