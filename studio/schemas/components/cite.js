import {defineField, defineType} from 'sanity'
import {LiaLinkSolid} from 'react-icons/lia'

export default defineType({
  name: 'cite',
  type: 'object',
  title: 'External Citation',
  fields: [
    defineField({
      name: 'externalCite',
      title: 'Person',
      type: 'externalCite',
    }),
  ],
  preview: {
    select: {
      internal: 'link.internal',
      external: 'link.external',
    },
    prepare(selection) {
      const {internal, external} = selection

      return {
        title: internal ? 'Internal Link' : 'External Link',
        //subtitle: `${children && children.length} Child Items`,
        icon: LiaLinkSolid,
      }
    },
  },
})
