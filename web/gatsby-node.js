/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { paginate, createPagePerItem } = require("gatsby-awesome-pagination")


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type categories implements Node {
      name: String
    }
    type ShowArchive implements Node {
      setArchive: Boolean
      archive: [SanityCategories]
    }
    type SanityPage implements Node {
      showArchive: ShowArchive
    }
    type SanityPost implements Node {
      metaTitle: String
      metaDescription: String
    }
    type SanityPlace implements Node {
      slug: SanitySlug
    }
    type SanityImageAsset implements Node {
      altText: String
    }  
  `
  createTypes(typeDefs)
}

exports.createPages = async function ({ graphql, actions, reporter }) {
  const { createPage } = actions
  const result = await graphql(`
  query SanityAllData {
    allSanityPage {
      nodes {
        id
        slug {
          current
        }
        navColor{
          value
        }
        pageTitle
        pageBuilder{
          ... on SanityBlogSection {
            _key
            _type
            showArchive {
              archive {
                name
                _id
              }
            }
          }
        }
      }
    }
    allSanityTeamMember {
      nodes {
        _rawBio
        title
        position
        name
        linkedIn
        email
      }
    }
    allSanityCaseStudy {
      nodes {
        _key
        _id
        title
        slug {
          current
        }
        category {
          name
          _id
        }
      }
    }
    allSanityPost {
      nodes {
        title
        slug {
          current
        }
        category {
          name
          _id
        }
      }
    }
  }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Fetch your items (blog posts, categories, etc).
  const blogPosts = result.data?.allSanityPost?.nodes || []
  const caseStudies = result.data?.allSanityCaseStudy.nodes || []
  const teamMembers = result.data?.allSanityTeamMember.nodes || []
  
  //const blogPages = result.data?.blogPages?.nodes || []

  const blogPostsCategories = blogPosts.map(({ category }) => category && category._id)
  
  console.log(`All Post Cats = ${blogPostsCategories}`)

  function hasShowArchive(array) {
    for (let i = 0; i < array.length; i++) {
      if ('showArchive' in array[i]) {
        return true; // Found object with the key 'showArchive'
      }
    }
    return false; // Key not found in any object
  }

  function getShowArchiveIds(pageBuilder) {
    const pageBuilderArray = pageBuilder || []; // Extract pageBuilder array
  
    const ids = pageBuilderArray.reduce((acc, currentItem) => {
      if (currentItem && currentItem.showArchive && currentItem.showArchive.archive) {
        const archiveItems = currentItem.showArchive.archive;
  
        archiveItems.forEach(archiveItem => {
          if (archiveItem._id) {
            acc.push(archiveItem._id);
          }
        });
      }
      return acc;
    }, []);
  console.log(`BPC: ${blogPostsCategories} - ids: ${ids}`)
    return ids.length === 0 ? blogPostsCategories : ids;
  }

  result.data.allSanityPage.nodes.forEach(node => {

    // Check if the array has an object with the key 'showArchive'
    const hasKey = hasShowArchive(node?.pageBuilder);

    if (hasKey) {
      paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 3,
        pathPrefix: `/${node.slug.current}`,
        component: require.resolve(`./src/templates/blogArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
        context: {
          id: node.id,
          slug: `${node.slug.current}`,
          node: node,
          postIds: getShowArchiveIds(node?.pageBuilder)
        },
      })
    }
    else {
      createPage({
        path: node.slug.current,
        component: require.resolve(`./src/templates/pageTemplate.jsx`),
        context: {
          id: node.id,
          slug: `${node.slug.current}`,
          node: node,
          postIds: getShowArchiveIds(node?.pageBuilder),
          navColor: node.navColor
        },
      })

    }
  })

  blogPosts.forEach(node => {
    createPage({
      path: `blog/${node.slug.current}`,
      component: require.resolve(`./src/templates/postTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
      },
    })
  })

  caseStudies.forEach(node => {
    createPage({
      path: `case-studies/${node.slug.current}`,
      component: require.resolve(`./src/templates/caseStudyTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
      },
    })
  })

  teamMembers.forEach(node => {
    createPage({
      path: `team-members/${node.slug.current}`,
      component: require.resolve(`./src/templates/caseStudyTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
      },
    })
  })
  

}

