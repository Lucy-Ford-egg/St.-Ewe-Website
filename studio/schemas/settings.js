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
    defineField({
      name: "colors",
      type: "object", // required
      title: "Color List",
      description: "Pick a color",
      fields: [
        defineField({ name: 'primary', type: 'string', title: "Red", value: "#f16d70" }),
        defineField({ name: 'secondary', type: 'string', title:  "Teal", value: "#88c6db" }),
        defineField({ name: 'tertiary', type: 'string', title:  "Purple", value: "#aca0cc" }),
        defineField({ name: 'white', type: 'string', title:  "Green", value: "#bdcdcb" }),
        defineField({ name: 'black', type: 'string', title:  "White", value: "white" })
      ],
    },),
    
  ]
})