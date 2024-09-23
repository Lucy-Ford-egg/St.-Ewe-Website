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
      title: 'Title',
      type: 'string',

    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',

    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // options: {
      //   source: 'name',
      //   maxLength: 96,
      //   isUnique: (value, context) => { 
      //     return (
      //     context.defaultIsUnique(value, context)
      //   )},
      // },

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