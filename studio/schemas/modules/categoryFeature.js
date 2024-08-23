import { defineField, defineType } from 'sanity'
import {MdViewColumn} from "react-icons/lia"

export default defineType({
  name: "categoryFeature",
  type: "object",
  title: "Category Feature module",
  description: "Displays a title, image and excerpt of text for 3 categorys.",
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
  ],
  preview: {
    select: {
      title: 'gridTitleSubtitleText',
      subtitle: 'categories'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title.displayTitle[0].children[0].text,
        subtitle: `Caterogies added - ${subtitle.length} Category Feature module`,
        icon: MdViewColumn
      }
    }
  },
})