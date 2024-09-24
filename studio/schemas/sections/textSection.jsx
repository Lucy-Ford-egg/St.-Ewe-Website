import React from 'react';
import { defineField, defineType } from 'sanity'
import {  LiaParagraphSolid, LiaNewspaper, LiaFilePdfSolid } from "react-icons/lia";
// Optional: import Rule from '@sanity/types' if needed

export default defineType({
    name: 'textSection',
    type: 'object',
    title: 'Text Section',
    fields: [
        defineField({
            name: 'text',
            type: 'array',
            title: 'Text',
            of: [{
                type: 'block',
                lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' }
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
                        { title: 'Strong', value: 'strong' },
                        { title: 'Emphasis', value: 'em' },
                        { title: 'Underline', value: 'underline' },
                    ],
                    annotations: [
                        { type: 'textColor' },
                        { type: 'textColumns' },
                        {
                            name: 'internalLink',
                            type: 'object',
                            title: 'Internal link',
                            fields: [
                                {
                                    name: 'reference',
                                    type: 'reference',
                                    title: 'Reference',
                                    to: [
                                        { type: 'post' }, { type: 'page' }, { type: 'recipes' }
                                        // other types you may want to link to
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'link',
                            type: 'object',
                            title: 'External link',
                            fields: [
                                {
                                    name: 'href',
                                    type: 'url',
                                    title: 'URL',
                                    validation: Rule => Rule.uri({
                                        scheme: ['http', 'https', 'mailto', 'tel']
                                    })
                                },
                                {
                                    title: 'Open in new tab',
                                    name: 'blank',
                                    type: 'boolean'
                                }
                            ]
                        },
                        { type: 'file', icon: LiaFilePdfSolid },
                        { type: 'textColor', },
                        // {type: 'imageOptions'},  
                    ],
                }
            },
            {
                type: 'image',
                validation: (rule) => rule.required(),
            }
            ],
            validation: (rule) => rule.required(),
            description: "The editor should allow for most text formatting.",
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
            title: 'Side Assets',
            name: 'sideAssets',
            type: 'supportingAssets',
        })
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'caseStudies',
            backgroundColour: 'backgroundColour',
        },
        prepare(selection) {
            const { title, subtitle, backgroundColour } = selection;
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
                    <LiaParagraphSolid style={{ color: 'white' }} />
                </span>
            );
   
            return {
                title: `${title[0]?.children[0]?.text}`,
                subtitle: `Text Section`,
                media: thumb, // Check if JSX is allowed or handle icons differently
            };
        },
    },
});
