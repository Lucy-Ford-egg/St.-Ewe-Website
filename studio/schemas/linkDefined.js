import { defineField, defineType } from 'sanity'
import { MdAddLink } from "react-icons/md";


export default defineType({
  name: 'linkDefined',
  type: 'object',
  title: 'Link',
  icon: MdAddLink,
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
  ],
});