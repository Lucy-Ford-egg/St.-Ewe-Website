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
  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     date: 'date',
  //     media: 'coverImage',
  //   },
  //   prepare({ title, media, author, date }) {
  //     const subtitles = [
  //       location && `by ${author}`,
  //       date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
  //     ].filter(Boolean)

  //     return { title, media, subtitle: subtitles.join(' ') }
  //   },
  // },
})