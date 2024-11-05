import {defineField, defineType} from 'sanity'
import {LiaCalendarDaySolid} from 'react-icons/lia'

export default defineType({
  name: 'timelineSection',
  type: 'object',
  title: 'Timeline Section',
  fields: [
    defineField({
      name: 'times',
      title: 'Time Events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'timeline'}],
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
      steps: 'times',
    },
    prepare(selection) {
      const {steps} = selection
      return {
        title: `${steps ? steps?.length : 0} - Events`,
        subtitle: `Timeline Section`,
        // media: media,
        icon: LiaCalendarDaySolid,
      }
    },
  },
})
