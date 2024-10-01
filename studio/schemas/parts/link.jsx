import { defineField, defineType } from 'sanity'
import { LiaLinkSolid } from "react-icons/lia";

export default defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'external',
      type: 'url',
      title: 'URL',
      hidden: ({ parent, value }) => !value && parent?.internal,
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    },
    {
      name: 'internal',
      type: 'reference',
      to: [{ type: 'post' }, { type: 'page' },],
      hidden: ({ parent, value }) => !value && parent?.external
    }
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
        icon: LiaLinkSolid,
      }
    }
  },
})