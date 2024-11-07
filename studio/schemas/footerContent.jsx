import {LiaBarsSolid} from 'react-icons/lia'
import {defineField, defineType} from 'sanity'

export const accreditation = defineType({
  name: 'accreditation',
  type: 'object',
  title: 'Accreditation',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Link',
    }),
  ],
  preview: {
    select: {
      title: 'url',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title ? title : 'Link not set',
        media: media,
      }
    },
  },
})

export const accreditations = defineType({
  name: 'accreditations',
  type: 'array',
  title: 'Accreditations',
  of: [{type: 'accreditation'}],
  description: 'Shown in the footer. Drag to reorder',
  validation: (Rule) => Rule.min(1).max(6),
})

export const footerMenu = defineType({
  name: 'footerMenu',
  type: 'object',
  title: 'Footer Menu',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: '',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Link(s)',
      of: [{type: 'linkDefined'}],
      description: 'Add a link(s). Optional',
    }),
  ],
  description: 'Shown in the footer.',
})

export default defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  icon: LiaBarsSolid,
  groups: [
    {
      name: 'menuOne',
      title: 'Menu 1',
      default: true,
    },
    {
      name: 'menuTwo',
      title: 'Menu 2',
    },
    {
      name: 'menuThree',
      title: 'Menu 3',
    },
    {
      name: 'menuFour',
      title: 'Menu 4',
    },
    {
      name: 'copyright',
      title: 'Copyright',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'footerMenuOne',
      type: 'footerMenu',
      title: 'Footer Menu One',
      group: 'menuOne',
    }),
    defineField({
      name: 'footerMenuTwo',
      type: 'footerMenu',
      title: 'Footer Menu Two',
      group: 'menuTwo',
    }),
    defineField({
      name: 'footerMenuThree',
      type: 'footerMenu',
      title: 'Footer Menu Three',
      group: 'menuThree',
    }),
    defineField({
      name: 'footerMenuFour',
      type: 'footerMenu',
      title: 'Footer Menu Four',
      group: 'menuFour',
    }),
    defineField({
      name: 'accreditations',
      type: 'accreditations',
      title: 'Accreditations',
      group: 'menuFour',
    }),
    defineField({
      name: 'incorparated',
      type: 'string',
      title: 'Corporation & Registered',
      group: 'copyright',
    }),
    defineField({
      name: 'companyName',
      type: 'string',
      title: 'Company Name',
      group: 'copyright',
    }),
  ],
})
