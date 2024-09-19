import { LiaSmile } from "react-icons/lia";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  icon: LiaSmile,
  type: 'document',
  fields: [
    // defineField({
    //   name: 'name',
    //   title: 'Name',
    //   type: 'string',
    //   validation: (rule) => rule.required(),
    // }),
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'slug', type: 'slug'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'avatar', type: 'image'}),
  ],
})

