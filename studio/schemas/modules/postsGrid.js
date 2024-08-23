import { defineField, defineType } from 'sanity'
import {LiaFile} from "react-icons/lia"

export default defineType({
  name: "postsGrid",
  type: "object",
  title: "Posts Grid module",
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
  ],
  preview: {
    select: {
      title: 'gridTitleSubtitleText',
      subtitle: 'posts'
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: title ? title?.displayTitle[0].children[0].text : "Empty Title",
        subtitle: `${subtitle && subtitle?.length > 0 ? "Curated Posts" : "All Posts"} | Module: Module: Posts Grid module`,
        icon: LiaFile
      }
    }
  },
})