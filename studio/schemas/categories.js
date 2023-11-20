import { MdCategory } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categories',
  title: 'Post Categories',
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
    //   name: 'excerpt',
    //   title: 'Excerpt',
    //   type: 'text',
    //   validation: (rule) => rule.required().max(253),
    // }),
    // defineField({
    //   name: 'picture',
    //   title: 'Picture',
    //   type: 'image',
    //   options: { hotspot: true },
    //   validation: (rule) => rule.required(),
    // }),
  ],
  preview: {
    select: {
      title: 'name',
      //media: 'picture',
    },
    prepare({ title}) {
    

      return { title }
    },
  },
})