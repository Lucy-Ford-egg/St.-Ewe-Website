import { defineField, defineType } from 'sanity'
import {MdWebStories} from "react-icons/md"

export default defineType({
  name: "caseStudySection",
  type: "object",
  title: "Case Study Section",
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      //validation: (rule) => rule.required(),
      
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          //{ title: 'Bullet', value: 'bullet' },
          //{ title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          
        ],
        marks: {
          decorators: [
            //{ title: 'Strong', value: 'strong' },
            //{ title: 'Emphasis', value: 'em' },
            //{ title: 'Underline', value: 'underline' },
          ]
        }
      }
    ],
    }),
    defineField({
      name: 'leftText',
      title: 'Left Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Lead', value: 'body2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }
    ],
    }),
    defineField({
      name: 'rightText',
      title: 'Right Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ]
        }
      }],
    }),
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
    defineField({
      name: 'asCarousel',
      type: 'boolean',
      title: 'Display as carousel',
    }), 
    defineField({
      name: 'disableSummary',
      type: 'boolean',
      title: 'Disable Summary',
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
        title:  (title && title?.[0]?.children[0]?.text) || "Empty Title",
        subtitle: `${subtitle && subtitle?.length > 0 ? "Curated Case Studies" : "All Case Studies"} | Case Study Section`,
        icon: MdWebStories
      }
    }
  },
})