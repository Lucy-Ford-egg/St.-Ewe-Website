import { defineType } from 'sanity'

export default defineType({
    name: 'hotspotItem',
    type: 'object',
    fieldsets: [{ name: 'position', options: { columns: 2 } }],
    fields: [
        { name: 'details', type: 'text', rows: 2 },
        {
            name: 'x',
            type: 'number',
            readOnly: true,
            fieldset: 'position',
            initialValue: 50,
            validation: (Rule) => Rule.required().min(0).max(100),
        },
        {
            name: 'y',
            type: 'number',
            readOnly: true,
            fieldset: 'position',
            initialValue: 50,
            validation: (Rule) => Rule.required().min(0).max(100),
        },
    ],
    preview: {
        select: {
            title: 'details',
            x: 'x',
            y: 'y',
        },
        prepare({ title, x, y }) {
            return {
                title,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
            }
        },
    },
})
