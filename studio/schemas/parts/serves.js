import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serves',
  title: 'Serves',
  type: 'object',
  // icon: LiaListSolid,
  fields: [
    defineField({
      name: "serves",
      title: "Serves",
      type: "number",
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
    }),
  ],
  options: {
    columns: 2,
  },
  description: 'How many does this Recipe serve',
});
