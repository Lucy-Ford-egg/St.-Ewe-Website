import { defineField, defineType } from 'sanity'

export default defineType({
      name: 'showArchive',
      type: 'object',
      title: 'Show an archive of blog posts on page.',
      description: 'This inserts a blog grid in the 2nd postion in the module builder',
      //description: `Select this to page the a page with all the blog posts. Example: This is used to make the blog page but could also be used to make another page containing blog posts. This will then use a template which inserts the the blog posts for this template directly underneath the first component.`,
      group: 'pageContent',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'setArchive',
          type: 'boolean',
          title: 'Set to display all posts',
          //description: `Select this to page the a page with all the blog posts. Example: This is used to make the blog page but could also be used to make another page containing blog posts. This will then use a template which inserts the the blog posts for this template directly underneath the first component.`,
          hidden: ({ parent, value }) => value && !!parent?.archive,
        }),
        defineField({
          name: 'archive',
          type: 'array',
          title: 'Show posts by specific categories',
          of: [
            {
              type: 'reference',
              to: [
                { type: 'categories' },
              ]
            }
          ],
          //description: `Select this to page the a page with all the blog posts. Example: This is used to make the blog page but could also be used to make another page containing blog posts. This will then use a template which inserts the the blog posts for this template directly underneath the first component.`,
          hidden: ({ parent, value }) => !value && !!parent?.setArchive,
        }),
      ],
      group: 'pageContent',
    })