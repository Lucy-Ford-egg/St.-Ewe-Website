import { defineField, defineType } from 'sanity'

export default defineType({
  name: "linkGroup",
  type: "object",
  title: "Link",
  fields: [
    defineField({
        name: 'externalLinkGroup',
        type: 'externalLink',
        title: 'External link',
        hidden: ({ parent, value }) => { 
          return(!value && parent?.internalLinkGroup._type === "internalLink")},
       
    }),
    defineField({
        name: 'internalLinkGroup',
        type: 'internalLink',
        title: 'Internal Link',
        hidden: ({ parent, value }) => { 
          return(!value && parent?.externalLinkGroup._type === "externalLink")} 
    }),
  ]
})