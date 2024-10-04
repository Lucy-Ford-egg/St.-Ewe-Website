import React from 'react';
import { defineField, defineType } from 'sanity'
import { LiaFontSolid } from 'react-icons/lia'
// Optional: import Rule from '@sanity/types' if needed

export default defineType({
    name: 'titleSection',
    type: 'object',
    title: 'Title Section',
    fields: [
        defineField({
            name: 'title',
            type: 'array',
            title: 'Title',
            of: [{
                type: 'block',
                lists: [
                    // { title: 'Bullet', value: 'bullet' },
                    // { title: 'Numbered', value: 'number' }
                ], // yes please, both bullet and numbered
                styles: [
                    { title: 'Heading 1', value: 'h1' },
                    { title: 'Heading 2', value: 'h2' },
                    { title: 'Heading 3', value: 'h3' },
                    { title: 'Heading 4', value: 'h4' },
                    { title: 'Heading 5', value: 'h5' },

                ],
                marks: {
                    decorators: [
                        //   { title: 'Strong', value: 'strong' },
                        //   { title: 'Emphasis', value: 'em' },
                        //   { title: 'Underline', value: 'underline' },
                    ],
                    annotations: [
                        { type: 'textColor' },
                    ],
                }
            },
            ],
            description: "You can highlight the text and use the formatting to change the title size and colour.",
        }),
        defineField({
            title: 'Use as Recipe title',
            name: 'isRecipe',
            type: 'boolean',
            description: 'Check this if you wish for the title of the recipe to be pulled in.'
        }),
        defineField({
            title: 'Insert Post Date',
            name: 'isPost',
            type: 'boolean',
            description: 'Check this if you wish for the date of the post to be pulled in as a subtitle to the title on a post single page.'
        }),
        defineField({
            title: 'Background Colour',
            name: 'backgroundColour',
            type: 'simplerColor',
            description: 'Add a background colour',
        }),
        defineField({
            name: 'link',
            type: 'linkDefined',
            title: 'Link',
            description: 'Add a link. Optional but hides right asset.',
        }),
        defineField({
            name: 'verticalSpace',
            type: 'verticalSpace',
            title: 'Set the space required between sections',
        }),
        defineField({
            name: 'alignment',
            type: 'textAlign',
            title: 'Alignment',
            description: 'Aligns text to the grid. If set to left will replace the left asset. If unset defaults to center',
        }),
        defineField({
            title: 'Side Assets',
            name: 'sideAssets',
            type: 'supportingAssets',
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'caseStudies',
            backgroundColour: 'backgroundColour',
            isRecipe: 'isRecipe'
        },
        prepare(selection) {
            const { title, subtitle, backgroundColour, isRecipe } = selection;
            const thumb = (
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: backgroundColour?.value,
                    }}
                >
                    <LiaFontSolid style={{ color: 'white' }} />
                </span>
            );
            return {
                title: `${isRecipe ? 'Using Recipe Title' : title[0]?.children[0]?.text}`,
                subtitle: `Title Section`,
                media: thumb, // Check if JSX is allowed or handle icons differently
            };
        },
    },
});
