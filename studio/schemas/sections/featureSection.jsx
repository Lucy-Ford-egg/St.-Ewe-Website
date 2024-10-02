import { defineField, defineType } from 'sanity'
import { LiaImage, LiaFilePdfSolid } from "react-icons/lia"


export default defineType({
  name: "featureSection",
  type: "object",
  title: "Feature Section",
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      //validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Heading 1', value: 'h1' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          { title: 'Subtitle', value: 'overline' },

        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
          ],
          annotations: [
            { type: 'textColor' },
            { type: 'textColumns' },
            {
              name: 'internalLink',
              type: 'object',
              title: 'Internal link',
              fields: [
                {
                  name: 'reference',
                  type: 'reference',
                  title: 'Reference',
                  to: [
                    { type: 'post' }, { type: 'page' }, { type: 'recipes' }
                    // other types you may want to link to
                  ]
                }
              ]
            },
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean'
                }
              ]
            },
            { type: 'file', icon: LiaFilePdfSolid },
            { type: 'textColor', },
            // {type: 'imageOptions'},  
          ],
        }
      },
        // {
        //     type: 'image',
        //     validation: (rule) => rule.required(),
        // }
      ],
      validation: (rule) => rule.required(),
      description: "The editor should allow for most text formatting.",
    }),

    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [
        { type: 'linkDefined' }
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
    }),
    defineField({
      name: 'mirror',
      type: 'boolean',
      title: 'Image positioned on the right',
      description: 'Select this to reverse the order to have Image on the right and text on the right.'
    }),
    defineField({
      name: "centerAsset",
      title: "Center Asset (optional)",
      type: "image",
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
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
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection



      return {
        title: title ? title : 'Title',
        subtitle: `Feature Section`,
        media: media,
        icon: LiaImage
      }
    }
  },
})