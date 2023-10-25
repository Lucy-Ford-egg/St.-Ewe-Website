import { MdOutlineMenu } from "react-icons/md";
import { MdAddLink } from "react-icons/md";

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigationItem',
    title: 'Navigation Item',
    type: 'object',
    fields: [
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
        link: 'link',
        subtitle: 'navigationItemUrl',
        children: 'childItems'
        // status: 'status'
      },
      prepare(selection) {
      debugger
        const {link, subtitle, children} = selection
        return {
          title: `${link.text}` ,
          subtitle: children && children.length >= 1 ? `${children.length} Child Items` : `No Child Items`,
          // icon: MdAddLink,
        }
      }
    },
})