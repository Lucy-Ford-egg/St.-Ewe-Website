import { MdOutlineChat } from "react-icons/md";
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menus',
  title: 'Menus',
  icon: MdOutlineChat,
  type: 'document',
  fields: [
    defineField({
      name: 'menuLocation',
      title: 'Menu Location',
      type: 'string',
      options: {
        list: [
          'Main Menu',
          'Footer Menu'
        ],
      },
    }),
    defineField({
      name: 'menuItem',
      title: 'MenuItem',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, {type: 'place'}, {type: 'news'}],
        },
        {
          title: 'External URL',
          name: 'externalUrl',
          type: 'url'
        }
     ]
    }),
  ],
})