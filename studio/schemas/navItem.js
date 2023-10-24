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
          title: "Navigation Label",
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: "link",
          type: "linkDefined", 
          title: "Navigation Item URL",
          hidden: ({ parent, value }) => !value && parent?.childItems
        }),
        defineField({
          name: "childItems",
          type: "array",
          title: "Child Navigation items",
          of: [{ type: "linkDefined" }],
        }),
  ],
    preview: {
      select: {
        title: 'text',
        subtitle: 'navigationItemUrl',
        children: 'childItems'
        // status: 'status'
      },
      prepare(selection) {
      
        const {title, subtitle, children} = selection
        return {
          title: `${title}` ,
          subtitle: children && children.length >= 1 ? `${children.length} Child Items` : `No Child Items`,
          // icon: MdAddLink,
        }
      }
    },
})