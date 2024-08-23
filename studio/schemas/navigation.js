import { LiaBarsSolid } from "react-icons/lia";
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: LiaBarsSolid,
    fields: [
      defineField({
        name: "title",
        type: "string",
        title: "Title",
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
        of: [{ type: "navigationItem" }],
      })        
    ]
})
