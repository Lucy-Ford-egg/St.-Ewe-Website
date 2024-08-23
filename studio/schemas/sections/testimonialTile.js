import { defineField, defineType } from 'sanity'
import {LiaBuromobelexperte} from "react-icons/lia"

export default defineType({
  name: "testimonialTile",
  type: "object",
  title: "Testimonial Tile",
  fields: [
    
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Add your quote. We got a max character count on this so they don`t get too long',
      rows: 6,
      // hidden: ({ parent, value }) => !value && parent?.icon
      validation: Rule => 
        Rule.required().max(260)
    }),
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
  ],
  preview: {
    select: {
      title: 'citeName',
      subtitle: 'citeLocation',
      avatar: 'image',
    },
    prepare(selection) {
      const { title, subtitle, avatar } = selection
      
      return {
        title: `${ title} - ${subtitle}`,
        subtitle: `Testimonial Tile`,
        media: avatar,
        icon: LiaBuromobelexperte
      }
    }
  },
})