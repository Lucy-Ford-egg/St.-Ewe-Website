import { MdOutlineMenu } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: MdOutlineMenu,
    fields: [
      defineField({
        name: "title",
        type: "string",
        title: "Title"
      }),
      defineField({
        name: 'navId',
        type: 'slug',
        title: "Navigation Id"
      }),
      defineField({
        name: "items",
        type: "array",
        title: "Navigation items",
        of: [{ type: "navigationItem" }]
      })        
    ]
})
