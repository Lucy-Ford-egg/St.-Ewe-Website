import {defineField, defineType} from 'sanity'

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
  description: 'Redirect for gatsby-node.js',
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
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
    }),
  ],
  // null / false makes it temporary (307)
  initialValue: {
    permanent: true,
  },
})
