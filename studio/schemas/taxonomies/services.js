import { MdCategory } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  icon: MdCategory,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title}) {
    

      return { title }
    },
  },
})