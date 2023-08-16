import { defineField, defineType } from 'sanity'

export default defineType({
  name: "instagramEmbeds",
  type: "object",
  title: "Instagram Embeds",
  fields: [
    defineField({
      name: 'allInstagramEmbeds',
      title: 'Instagram Embeds',
      type: 'array',
      description: "Visit an Instagram post and copy the embed code.",
      of: [{ 
        type: 'embedBlock', 
      }],
      validation: Rule => Rule.required().min(1).max(4)
    }),
  ],  
})