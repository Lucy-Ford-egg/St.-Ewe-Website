import { MdOutlineMyLocation } from "react-icons/md";
import { defineField, defineType } from 'sanity'
import countries from './countries'

export default defineType({
  name: 'location',
  title: 'Locations',
  icon: MdOutlineMyLocation,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'country',
      name: 'country',
      type: 'string',
      options: {
        list: [
          ...countries
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
})

