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
    defineField({
      name: 'inline',
      type: 'boolean',
      title: 'Inline',
      description: 'Setting this makes the link display inline. Social menu is an example of this.'
    })
  ],
});