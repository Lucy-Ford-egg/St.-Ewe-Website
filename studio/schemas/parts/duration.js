import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'duration',
  title: 'Duration',
  type: 'object',
  // icon: LiaListSolid,
    fields: [
        defineField({
        name: "hours",
        title: "hours",
        type: "number",
      }),
      defineField({
        name: "minutes",
        title: "Minutes",
        type: "number",
        validation: (rule) => rule.max(60),
      }),
    ],
    options: {
      columns: 2,
    },
    description: 'Shows the duration for the recipie',
    group: 'pageContent',
   
    // validation: (rule) => rule.required().max(252)
});
