import { defineField, defineType } from 'sanity'
import { MdPictureAsPdf, MdViewModule } from "react-icons/md";

export default defineType({
  name: "clientLoginSection",
  type: "object",
  title: "Client Login Section",
  fields: [
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          // { title: 'Bullet', value: 'bullet' },
          // { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
        ],
        marks: {
          annotations: [
            {
              type: 'textColor',
            }
          ],
          decorators: [
            // { title: 'Strong', value: 'strong' },
            // { title: 'Emphasis', value: 'em' },
            // { title: 'Underline', value: 'underline' },
          ]
        }
      }
      ],
    }), 

    defineField({
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Small', value: 'caption' },
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
          ],
          annotations: [
            
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
                    { type: 'post' }, {type: 'page'}
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
                  }),
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  default: true,
                  type: 'boolean'
                }
              ]
            },
            {type: 'file', icon: MdPictureAsPdf},
            {type: 'textColor',},
            // {type: 'imageOptions'},  
          ],
        }
      }
      ],
    }),
    
    defineField({
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
    }),
    defineField({
      title: 'Logins',
      name: 'loginTile',
      type: 'array',
      of: [{type: 'loginTile'}]
    })
  
  ],
  preview: {
    select: {
      title: 'title',
      textAlign: 'textAlign'

    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Client Login Section`,
        // media: media,
        icon: MdViewModule
      }
    }
  },
})