import { defineField, defineType } from 'sanity'

export default defineType({
  name: "mediumBasicTextEditor",
  type: "object",
  title: "Medium Text",
  fields: [
    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{ 
        type: 'block',
        lists: [], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          // { title: 'Heading 4', value: 'h4' },
        ],
        marks: {
          decorators: [],
          annotations: []
        }
      }],   
    }),
    // defineField({
    //   name: 'text',
    //   title: 'Text',
    //   type: 'array',
    //   of: [{ 
    //     type: 'block',
    //     lists: [
    //       {title: 'Bullet', value: 'bullet'},
    //       {title: 'Numbered', value: 'number'}
    //     ] // yes please, both bullet and numbered
    //   }],
    //   marks: {
    //     decorators: [
    //       {title: 'Strong', value: 'strong'},
    //       {title: 'Emphasis', value: 'em'},
    //       {title: 'Code', value: 'code'}
    //     ]
    //   }
    // }),
  ]
})