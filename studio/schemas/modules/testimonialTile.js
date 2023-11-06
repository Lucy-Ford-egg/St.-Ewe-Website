import { defineField, defineType } from 'sanity'
import {MdWebAsset} from "react-icons/md"

export default defineType({
  name: "testimonialTile",
  type: "object",
  title: "Testimonial Tile",
  fields: [
    defineField({
      name: 'starRating',
      type: 'number',
      title: 'Star Rating',
      options: {
        list: [1,2,3,4,5],
        layout: 'radio',
        direction: 'horizontal',
      }
    }), 
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Add your quote. We got a max character count on this so they don`t get too long',
      rows: 6,
      // hidden: ({ parent, value }) => !value && parent?.icon
      validation: Rule => 
        Rule.required().max(191)
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Avatar',
      validation: Rule => Rule.required(),
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
      description: 'Add some context around the person giving the quote. Example: Happy Camper, Cardiff.',
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
        icon: MdWebAsset
      }
    }
  },
})