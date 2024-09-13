import { defineField, defineType } from 'sanity'
import { LiaLinkSolid } from "react-icons/lia";


export default defineType({
  name: 'linkDefined',
  type: 'object',
  title: 'Link',
  icon: LiaLinkSolid,
  description: 'This field is hidden if you have a right asset.',
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