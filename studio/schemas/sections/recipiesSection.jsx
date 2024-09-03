import { defineField, defineType } from 'sanity'
import {LiaFile} from "react-icons/lia"

export default defineType({
  name: "recipiesSection",
  type: "object",
  title: "Recipies Section",
  fields: [
    defineField({
      title: 'Background Colour',
    name: 'backgroundColour',
    type: 'simplerColor',
    description: 'Add a background colour'
  }),
    defineField({
      name: 'showRecipiesArchive',
      type: 'showRecipiesArchive',
      title: 'Show Case Study Archive',
      validation: Rule => Rule.required(),
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
      subtitle: 'caseStudies',
      backgroundColour: 'backgroundColour',
    },
    prepare(selection) {
      const {title, subtitle, backgroundColour} = selection
      const thumb = <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: backgroundColour?.value}}><LiaFile style={{color: 'white'}}/></span>
      return {
        title:  (title && title?.[0]?.children[0]?.text) || "Empty Title",
        subtitle: `${subtitle && subtitle?.length > 0 ? "Curated Recipies" : "All Recipies"} | Recipies Section`,
        media: thumb,
      }
    }
  },
})