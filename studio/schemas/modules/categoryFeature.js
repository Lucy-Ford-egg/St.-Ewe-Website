import { defineField, defineType } from 'sanity'
import {MdViewColumn} from "react-icons/md"

export default defineType({
  name: "categoryFeature",
  type: "object",
  title: "Category Feature module",
  description: "Displays a title, image and excerpt of text for 3 categorys.",
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Category Feature module`,
        subtitle: ``,
        icon: MdViewColumn
      }
    }
  },
  fields: [
    defineField({
      name: 'gridTitleSubtitleText',
      type: 'titleSubtitleText',
      title: 'Add a Title, subtitle, text' 
    }),
    defineField({
      name: 'categories',
      title: 'Add Categories',
      type: 'array',
      description: 'Select 3 categories you wish to promote in a grid.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'categories' }],
        },
     ],
     validation: Rule => Rule.required().min(3).max(3)
    }),
  ]
})