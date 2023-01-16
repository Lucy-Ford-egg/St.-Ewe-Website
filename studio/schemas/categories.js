import { MdCategory } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categories',
  title: 'Categories',
  icon: MdCategory,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'picture',
    //   title: 'Picture',
    //   type: 'image',
    //   options: { hotspot: true },
    //   validation: (rule) => rule.required(),
    // }),
  ],
})