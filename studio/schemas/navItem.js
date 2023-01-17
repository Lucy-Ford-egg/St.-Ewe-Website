import { MdOutlineMenu } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigationItem',
    title: 'Navigation Item',
    type: 'object',
    icon: MdOutlineMenu,
    fields: [
        defineField({
            name: "text",
            type: "string",
            title: "Navigation Text"
          }),
          defineField({
            name: "navigationItemUrl",
            type: "link", 
            title: "Navigation Item URL"
          })
    ]
})