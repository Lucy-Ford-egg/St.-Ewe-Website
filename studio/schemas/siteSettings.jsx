import {MdOutlineMenu} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export const companyDetailType = defineType({
  name: 'companyDetailType',
  title: 'Company Detail',
  type: 'object',
  fields: [
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
  title: 'Company Detials',
  of: [{type: 'companyDetailType'}],
  description: 'Shown in the footer.',
  validation: (Rule) => Rule.min(1).max(2),
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
      name: 'newsletterSetup',
      title: 'Newsletter Setup',
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
      name: 'newsletterSetup',
      type: 'newsletterSetup',
      title: 'Newsletter Setup',
      group: 'newsletterSetup',
    }),
  ],
})
