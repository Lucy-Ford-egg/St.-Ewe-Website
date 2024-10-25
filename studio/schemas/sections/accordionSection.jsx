import {defineField, defineType} from 'sanity'
import {LiaQuestionCircle} from 'react-icons/lia'
export default defineType({
  name: 'accordionSection',
  type: 'object',
  title: 'Accordion Section',
  fields: [
    defineField({
      name: 'accordion',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'faqs', title: 'FAQS'},
            {type: 'careers', title: 'Careers'},
          ],
        },
      ],
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
    }),
    defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      accordion: 'accordion',
    },
    prepare(selection) {
      const {title, accordion} = selection
      return {
        title: `${accordion ? accordion?.length : 0} Items`,
        subtitle: `Accordion Section`,
        icon: LiaQuestionCircle,
      }
    },
  },
})
