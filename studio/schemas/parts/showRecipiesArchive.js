import { defineField, defineType } from 'sanity'

export default defineType({
      name: 'showRecipiesArchive',
      type: 'object',
      title: 'Show an archive of Recipies on page.',
      description: '',
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
          title: 'Set to display all Recipies',
          //description: `Select this to page the a page with all the blog posts. Example: This is used to make the blog page but could also be used to make another page containing blog posts. This will then use a template which inserts the the blog posts for this template directly underneath the first component.`,
          hidden: ({ parent, value }) => value && !!parent?.archive,
        }),
        defineField({
          name: 'archive',
          type: 'array',
          title: 'Show Recipies by specific category',
          of: [
            {
              type: 'reference',
              to: [
                { type: 'recipies' },
              ]
            }
          ],
          //description: `Select this to page the a page with all the blog posts. Example: This is used to make the blog page but could also be used to make another page containing blog posts. This will then use a template which inserts the the blog posts for this template directly underneath the first component.`,
          hidden: ({ parent, value }) => !value && !!parent?.setArchive,
        }),
      ],
      //group: 'pageContent',
    })