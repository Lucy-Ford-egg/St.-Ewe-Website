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
  description: 'Shown in the footer. Drag to reorder'
})

export const ballotSetupType = defineType({
    name:'ballotSetup',
    type: 'object',
    title: 'Ballot Setup',
    fields:[
      defineField({
        name: 'ballotUrl',
        type: 'url',
        title: 'Add the link to the Ballot (GemaPark link)',
        initialValue: 'https://bookings.gemapark.co.uk/Secure/AccountAreaLogin.aspx?ReturnUrl=%2fSecure%2faccountarea%2fballot.aspx%3fcid%3d335%26pid%3d13193%26cul%3den-GB&cid=335&pid=13193&cul=en-GB'
      }),
      defineField({
        name: "showBallot",
        type: "boolean",
        title: "Show Ballot",
        description: "Toggle to show the the Ballot button in the navigation and allow ballot bookings"
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
      name: 'theBallot',
      title: 'The Ballot',
    },
    {
      name: 'awardsWon',
      title: 'Awards Won'
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
      name:'ballot',
      type: 'ballotSetup',
      title: 'Ballot Setup',
      group: 'theBallot'
    }),
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
    })
  ]
})