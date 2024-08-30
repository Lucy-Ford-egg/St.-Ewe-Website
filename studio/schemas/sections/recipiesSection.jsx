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
      name: 'showRecipiesArchive',
      type: 'showRecipiesArchive',
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