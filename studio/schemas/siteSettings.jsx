import {MdOutlineMenu} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export const companyDetailType = defineType({
  name: 'companyDetailType',
  title: 'Company Detail',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'address1',
      type: 'string',
      title: 'Address Line 1',
    }),
    defineField({
      name: 'address2',
      type: 'string',
      title: 'Address Line 2',
    }),
    defineField({
      name: 'address3',
      type: 'string',
      title: 'Address Line 3',
    }),
    defineField({
      name: 'address4',
      type: 'string',
      title: 'Address Line 4',
    }),
    defineField({
      name: 'county',
      type: 'string',
      title: 'County',
    }),
    defineField({
      name: 'postcode',
      type: 'string',
      title: 'Postcode',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'geopoint',
      type: 'geopoint',
      title: 'Lat/Lng',
    }),
  ],
})

export const companyDetailsType = defineType({
  name: 'companyDetails',
  type: 'array',
  title: 'Company Details',
  of: [{type: 'companyDetailType'}],
  description: 'Shown in the footer.',
  validation: (Rule) => Rule.min(1).max(2),
})

export const footerDetailsType = defineType({
  name: 'footerDetails',
  type: 'object',
  title: 'Footer Details',
  fields:[
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: '',
    }),
    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{
        type: 'block',
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' }
        ], // yes please, both bullet and numbered
        styles: [
          { title: 'Lead', value: 'body2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Heading 4', value: 'h4' },
          { title: 'Heading 5', value: 'h5' },
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
                  title: 'URL'
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  default: true,
                  type: 'boolean'
                }
              ]
            },
          ],
        }
      },
    ],
      validation: (rule) => rule.required(),
      description: "",
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [
        {type: 'linkDefined'}
      ],
      description: 'Add a link(s). Optional',
      validation: Rule => Rule.min(1).max(2),
    }),
  ],
  description: 'Shown in the footer.',
})

export const newsletterType = defineType({
  name: 'newsletterSetup',
  type: 'object',
  title: 'Newsletter Setup',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title to show on the newsletter',
    }),
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      description: 'Text to show on the newsletter',
    }),
    defineField({
      name: 'consentText',
      type: 'array',
      title: 'Consent Text',
      description: 'Edit the consent text on the newsletter',
      of: [{type: 'block'}],
    }),
  ],
})

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'siteSettings',
      title: 'Site Settings',
      default: true,
    },
    {
      name: 'companyDetails',
      title: 'Company Details',
    },
    {
      name: 'footerDetails',
      title: 'Footer Details',
    },
  ],
  icon: MdOutlineMenu,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'siteSettings',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'siteSettings',
    }),
    defineField({
      name: 'companyDetails',
      type: 'companyDetails',
      title: 'Company Details',
      group: 'companyDetails',
    }),
    defineField({
      name: 'footerDetails',
      type: 'footerDetails',
      title: 'Footer Details',
      group: 'footerDetails',
    }),
  ],
})
