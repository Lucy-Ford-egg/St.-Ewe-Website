import { defineField, defineType } from 'sanity'
import { MdAddLink } from "react-icons/md";

export default defineType({
  name: 'cite',
  type: 'object',
  title: 'External Citation',
  fields: [
    defineField({
      name: 'teamMemberCite',
      type: 'reference',
      title: 'Internal Cite',
      to: [{ type: 'teamMember', title: 'Team Member' }],
      // hidden: ({ parent, value }) => {
      //   debugger
      //    return ( value && parent?.externalCite
      //     ) }
    }),
    defineField({
      name: 'externalCite',
      title: 'Person',
      type: 'externalCite',
      // hidden: ({ parent, value }) => {
      //   debugger
      //    return ( value && parent?.teamMemberCite)
      //   }
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
        title: internal ? "Internal Link" : "External Link",
        //subtitle: `${children && children.length} Child Items`,
        icon: MdAddLink,
      }
    }
  },
})