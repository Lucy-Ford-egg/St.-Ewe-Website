import {LiaSortAlphaDownSolid } from "react-icons/lia";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipesCategory',
  title: 'Recipes Category',
  icon:LiaSortAlphaDownSolid,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title}) {
    

      return { title }
    },
  },
})