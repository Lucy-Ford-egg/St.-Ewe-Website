export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '63208ff50a7e9248123a7325',
                  title: 'Sanity Studio',
                  name: 'architectural-holidays-studio',
                  apiId: 'b7953db7-0bea-4a78-90c2-43912d44c9ee'
                },
                {
                  buildHookId: '63208ff5d6999550b62912da',
                  title: 'Blog Website',
                  name: 'architectural-holidays',
                  apiId: '390033e7-93cb-4984-b24c-a86e60857741'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/eddiewilson/architectural-holidays',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://architectural-holidays.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
