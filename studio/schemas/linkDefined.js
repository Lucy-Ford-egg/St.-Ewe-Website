import { defineField, defineType } from 'sanity'
import { MdAddLink } from "react-icons/md";


export default defineType({
  name: 'linkDefined',
  type: 'object',
  title: 'Link',
  icon: MdAddLink,
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Navigation Label",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
  ],
});