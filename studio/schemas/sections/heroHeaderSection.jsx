import { defineField, defineType } from 'sanity'
import { LiaImage, LiaBorderStyleSolid } from "react-icons/lia"

export default defineType({
    name: "heroHeaderSection",
    type: "object",
    title: "Header Section",
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'text',
            description: 'Add a title',
        }),
        defineField({
            name: 'layers',
            type: 'array',
            title: 'Layers',
            of: [
                defineField({
                    name: 'image',
                    type: 'image',
                    title: 'Image',
                    //validation: Rule => Rule.required(),
                    options: {
                        hotspot: true,
                    },
                }),
            ]
        }),

        defineField({
            title: 'Background Colour',
            name: 'backgroundColour',
            type: 'simplerColor',
            description: 'Add a background colour',
        }),
        defineField({
            name: 'verticalSpace',
            type: 'verticalSpace',
            title: 'Set the space required between sections',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection



            return {
                title: title ? title : 'Title',
                subtitle: `Header Section`,
                media: media,
                icon: LiaImage
            }
        }
    },
})