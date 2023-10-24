import { MdOutlineMenu } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'object',
  icon: MdOutlineMenu,
  fields: [
    defineField({
      name: "ballot",
      type: "boolean",
      title: "Show Ballot",
      description: "Toggle to show the the Ballot button in the navigation and allow ballot bookings"
    }),
  ]
})