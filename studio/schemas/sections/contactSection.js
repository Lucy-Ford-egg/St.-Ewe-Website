import { defineField, defineType } from 'sanity'
import {MdMailOutline} from "react-icons/md"

export default defineType({
  name: "contactSection",
  type: "object",
  title: "Contact Section",
  fields: [ 
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
          // { title: 'Heading 2', value: 'h2' },
          //{ title: 'Lead', value: 'body2' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          //{ title: 'Quote', value: 'blockquote' }
        ],
        marks: {
          decorators: [
            // { title: 'Strong', value: 'strong' },
            // { title: 'Emphasis', value: 'em' },
            // { title: 'Underline', value: 'underline' },
          ],
          annotations: [
            // {
            //   name: 'internalLink',
            //   type: 'object',
            //   title: 'Internal link',
            //   fields: [
            //     {
            //       name: 'reference',
            //       type: 'reference',
            //       title: 'Reference',
            //       to: [
            //         { type: 'post' }, {type: 'page'}
            //         // other types you may want to link to
            //       ]
            //     }
            //   ]
            // },
            // {
            //   name: 'link',
            //   type: 'object',
            //   title: 'External link',
            //   fields: [
            //     {
            //       name: 'href',
            //       type: 'url',
            //       title: 'URL'
            //     },
            //     {
            //       title: 'Open in new tab',
            //       name: 'blank',
            //       default: true,
            //       type: 'boolean'
            //     }
            //   ]
            // },
            // {type: 'file', icon: MdPictureAsPdf},
            // {type: 'textColor',},
          
          ],
        }
      }, 
      // {
      //   type: 'image'
      // }
    ],
    validation: Rule =>
        Rule.required().max(260)
    }),
    defineField({
      name: 'formTerms',
      title: 'Form Terms',
      type: 'array',
      of: [{
        type: 'block',
        lists: [
          //{ title: 'Bullet', value: 'bullet' },
          //{ title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          //{ title: 'Lead', value: 'body2' },
          //{ title: 'Heading 2', value: 'h2' },
          //{ title: 'Heading 3', value: 'h3' },
          //{ title: 'Heading 4', value: 'h4' },
          //{ title: 'Heading 5', value: 'h5' },
          //{ title: 'Quote', value: 'blockquote' }
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
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  default: true,
                  type: 'boolean'
                }
              ]
            },
            // {type: 'file', icon: MdPictureAsPdf},
            // {type: 'textColor',},
          
          ],
        }
      }, 
      // {
      //   type: 'image'
      // }
    ],
      description: 'Add some text',
      validation: Rule =>
        Rule.required().max(260)
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
          // { title: 'Heading 2', value: 'h2' },
          { title: 'Lead', value: 'body2' },
          //{ title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
          //{ title: 'Quote', value: 'blockquote' }
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
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  default: true,
                  type: 'boolean'
                }
              ]
            },
            // {type: 'file', icon: MdPictureAsPdf},
            // {type: 'textColor',},
          
          ],
        }
      }, 
      // {
      //   type: 'image'
      // }
    ],
      description: 'Add some text',
      validation: Rule =>
        Rule.required().max(260)
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
    },
    prepare(selection) {
      const { title } = selection

      return {
        title: title ? title[0]?.children[0]?.text : 'Title',
        subtitle: `Contact Section`,
        icon: MdMailOutline
      }
    }
  },
})