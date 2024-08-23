import { defineField, defineType } from 'sanity'
import { LiaListSolid } from "react-icons/lia";



export default defineType({
  name: 'subItem',
  type: 'object',
  title: 'SubItem',
  icon: LiaListSolid,
  fields: [
    defineField({
      name: 'icon',
      type: 'icons',
      title: 'Icon',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }), 
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content. Optional'
    }),
  ],
});