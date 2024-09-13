import { defineType, defineField } from 'sanity'


const space = [{ title: "Sm", value: "MS4" }, { title: "Md", value: "MS6" }];

export default defineType({
    name: 'supportingAssets',
    title: 'Supporting Assets',
    type: 'object',
    // icon: LiaListSolid,
    fields: [
        defineField({
            name: "leftAsset",
            title: "Left Asset",
            type: "image",
        }),
        defineField({
            name: "rightAsset",
            title: "Right Asset",
            type: "image",
            
        }),
    ],
    options: {
        columns: 2,
    },
    description: 'If you populate the button then the right asset is hidden. They compete for the same space on the frontend.',
    group: 'pageContent',
    // validation: (rule) => rule.required().max(252)
});
