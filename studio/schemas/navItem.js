import { LiaBarsSolid } from "react-icons/lia";
import { LiaLinkSolid } from "react-icons/lia";

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
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
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
      
        const {link, subtitle, children} = selection
        return {
          title: `${link.text}` ,
          subtitle: children && children.length >= 1 ? `${children.length} Child Items` : `No Child Items`,
          // icon: LiaLinkSolid,
        }
      }
    },
})