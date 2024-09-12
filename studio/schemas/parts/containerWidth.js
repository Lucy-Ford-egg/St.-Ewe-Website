import { defineType, defineField } from 'sanity'


const space = [{title: "Small", value: "sm"},{title: "Medium", value: "md"}, {title: "Large", value: "lg"}];

export default defineType({
  name: 'containerWidth',
  title: 'Container Width',
  type: 'object',
  // icon: LiaListSolid,
    fields: [
      defineField({
        name: "width",
        title: "Top Padding",
        type: "string",
        options: {
          list: [...space],
          layout: 'radio',
        },
        initialValue: () => 'lg',
      }),
    ],
    options: {
      columns: 2,
    },
    description: 'Set the width of the content container',
    group: 'pageContent',
    // validation: (rule) => rule.required().max(252)
});
