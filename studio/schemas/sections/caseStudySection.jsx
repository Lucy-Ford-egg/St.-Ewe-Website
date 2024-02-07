import { defineField, defineType } from 'sanity'
import {MdWebStories} from "react-icons/md"

export default defineType({
  name: "caseStudySection",
  type: "object",
  title: "Case Study Section",
  fields: [
    defineField({
      name: 'showCaseStudyArchive',
      type: 'showCaseStudyArchive',
      title: 'Show Case Study Archive',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }), 
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caseStudies'
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: title ? title?.displayTitle[0].children[0].text : "Empty Title",
        subtitle: `${subtitle && subtitle?.length > 0 ? "Curated Case Studies" : "All Case Studies"} | Module: Module: Posts Grid module`,
        icon: MdWebStories
      }
    }
  },
})