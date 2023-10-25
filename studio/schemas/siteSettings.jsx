import { MdOutlineMenu } from "react-icons/md";
import { defineField, defineType } from 'sanity'

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

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: MdOutlineMenu,
  fields: [
    defineField(
      {
        name: 'title',
        title: 'Site Title',
        type: 'string'
      },
    ),
    defineField(
      {
        name: 'description',
        title: 'Site Description',
        type: 'text'
      }
    ),
    defineField({
      name:'ballot',
      type: 'ballotSetup',
      title: 'Ballot Setup',
    })
  ]
})