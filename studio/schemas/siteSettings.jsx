import { MdOutlineMenu } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export const awardType = defineType({
  name: 'awardType',
  type: 'object',
  title: 'Award',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link'
    })
  ],
  preview: {
    select: {
      title: 'url',
      media: 'image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title ? title : 'Link not set',
        media: media,
      }
    }
  },
})
export const awardsWonType = defineType({
  name: 'awardsWon',
  type: 'array',
  title: 'Awards won',
  of: [{type: 'awardType'}],
  description: 'Shown in the footer. Drag to reorder',
  validation: Rule => Rule.min(1).max(6)
})

export const newsletterType = defineType({
  name:'newsletterSetup',
  type: 'object',
  title: 'Newsletter Setup',
  fields:[
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title to show on the newsletter"
    }),
    defineField({
      name: "text",
      type: "string",
      title: "Text",
      description: "Text to show on the newsletter"
    }),
    defineField({
      name: "consentText",
      type: 'array', 
      title: "Consent Text",
      description: "Edit the consent text on the newsletter",
      of: [{type: 'block'}],
    }),
  ]
})

export const companyDetailsType = defineType({
  name: 'companyDetails',
  title: 'Company Details',
  type: 'document',
  fields: [
  defineField({
        name: 'address1',
        type: 'string',
        title: 'Address Line 1',
      }),
      defineField({
        name: 'address2',
        type: 'string',
        title: 'Address Line 2'
      }),
      defineField({
        name: 'county',
        type: 'string',
        title: 'County'
      }),
      defineField({
        name: 'postcode',
        type: 'string',
        title: 'Postcode'
      }),
      defineField({
        name: 'phone',
        type: 'string',
        title: 'Phone'
      }),
      defineField({
        name: 'email',
        type: 'string',
        title: 'Email'
      })
    ]
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
      name: 'awardsWon',
      title: 'Awards Won'
    },
    {
      name: 'newsletterSetup',
      title: 'Newsletter Setup'
    }
  ],
  icon: MdOutlineMenu,
  fields: [
    defineField(
      {
        name: 'title',
        title: 'Site Title',
        type: 'string',
        group: 'siteSettings'
      },
    ),
    defineField(
      {
        name: 'description',
        title: 'Site Description',
        type: 'text',
        group: 'siteSettings'
      }
    ),
    defineField({
      name: 'companyDetails',
      type: 'companyDetails',
      title: 'Company Details',
      group: 'companyDetails',
    }),
    defineField({
      name: 'awardsWon',
      type: 'awardsWon',
      title: 'Awards Won',
      group: 'awardsWon',
    }),
    defineField({
      name: 'newsletterSetup',
      type: 'newsletterSetup',
      title: 'Newsletter Setup',
      group: 'newsletterSetup'
    })
  ]
})