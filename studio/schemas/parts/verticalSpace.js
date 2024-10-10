import { defineType, defineField } from 'sanity'


const space = [{title: "Sm", value: "MS-6"}, {title: "Md", value: "MS6"}];

export default defineType({
  name: 'verticalSpace',
  title: 'Vertical Spacing',
  type: 'object',
  // icon: LiaListSolid,
    fields: [
      defineField({
        name: "topPadding",
        title: "Top Padding",
        type: "string",
        options: {
          list: [...space],
          layout: 'radio',
        },
        initialValue: () => 'MS6',
      }),
      defineField({
        name: "bottomPadding",
        title: "Bottom Padding",
        type: "string",
        options: {
          list: [...space],
          layout: 'radio',
        },
        initialValue: () => 'MS6',
      }),
    ],
    options: {
      columns: 2,
    },
    description: 'Adjust this settings if the section look too close or too spaced out',
    group: 'pageContent',
    // validation: (rule) => rule.required().max(252)
});
