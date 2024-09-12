import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hotspots',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'featureImage', type: 'image' }),
        defineField({
            name: 'hotspots',
            type: 'array',
            of: [{ type: 'hotspotItem' }],
            options: {
                imageHotspot: {
                    imagePath: 'featureImage',
                    descriptionPath: 'details',
                },
            },
        }),
    ],
});