import {defineField, defineType} from 'sanity'
import {format, parseISO} from 'date-fns'

// Shared validation for our redirect slugs
const slugValidator = (rule) =>
  rule.required().custom((value) => {
    if (!value || !value.current) return "Can't be blank"
    if (!value.current.startsWith('/')) {
      return 'The path must start with a /'
    }
    return true
  })

export default defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      type: 'slug',
      validation: (rule) => slugValidator(rule),
    }),
    defineField({
      name: 'destination',
      type: 'slug',
      validation: (rule) => slugValidator(rule),
      options: {
        isUnique: () => true, // Disable uniqueness check
      },
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  description: `Redirect for gatsby-node.js. If you won’t have time to get all the old urls and you decide that any other url that uses your old path /recipes/* should just be redirected to the new /recipe path. Here’s how you’d handle that:
    source: /recipes/*
    destination: /recipes
  `,
  // null / false makes it temporary (307)
  initialValue: {
    permanent: true,
  },
  preview: {
    select: {
      source: 'source.current',
      destination: 'destination.current',
      date: 'date',
    },
    prepare({source, destination, date}) {
      return {
        title: `Redirect from ${source} to ${destination}`,
        subtitle: date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      }
    },
  },
})
