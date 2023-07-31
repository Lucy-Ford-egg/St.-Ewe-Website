import { MdOutlineMenu } from "react-icons/md";
import { MdAddLink } from "react-icons/md";

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigationItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
      defineField({
          name: "text",
          type: "string",
          title: "Navigation Text",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "navigationItemUrl",
          type: "link", 
          title: "Navigation Item URL",
          validation: Rule => Rule.required(),
        })
  ],
    preview: {
      select: {
        title: 'text',
        subtitle: 'navigationItemUrl',
        // status: 'status'
      },
      prepare(selection) {
      
        const {title, subtitle} = selection
        return {
          title: title,
          subtitle: subtitle._type,
          icon: MdAddLink,
        }
      }
    },
})