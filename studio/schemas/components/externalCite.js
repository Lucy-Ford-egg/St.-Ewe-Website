import { defineField, defineType } from 'sanity'
// import { LiaLinkSolid } from "react-icons/lia";

export default defineType({
  name: 'externalCite',
  title: 'Person',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Avatar',
      options:{
        hotspot: true,
      }
    }), 
    defineField({
      name: 'citeName',
      type: 'string',
      title: 'Cite Name',
      validation: Rule => Rule.required(),
      description: 'Add the persons name.',
    }),
    defineField({
      name: 'citeLocation',
      type: 'string',
      title: 'Text',
      description: 'Add some context around the person giving the quote. Example: Founder.',
    }),
  ]
});