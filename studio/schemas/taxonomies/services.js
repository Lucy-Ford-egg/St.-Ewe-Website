import {LiaSortAlphaDownSolid } from "react-icons/lia";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  icon:LiaSortAlphaDownSolid,
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