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
    type service implements Node {
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
        _type
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
          ... on SanityCaseStudySection {
            _key
            _type
            showCaseStudyArchive {
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
        _type
        _rawBio
        title
        position
        name
        linkedIn
        email
        slug{
          current
        }
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
        service {
          name
          _id
        }
      }
    }
    allSanityPost {
      nodes {
        navColor{
          value
        }
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

  function hasShowArchive(pageBuilder) {
    
    for (let i = 0; i < pageBuilder.length; i++) {
      console.log("What Type",  pageBuilder[i]._type)
      if ('showArchive' in pageBuilder[i]) {
        console.info('Found object with the key `showArchive`')
        return true; // Found object with the key 'showArchive'
      }
      if(pageBuilder[i]._type == "caseStudySection"){
        console.log('We have a caseStudySection')
        if ('showCaseStudyArchive' in pageBuilder[i]) {
          console.info('Found object with the key `showCaseStudyArchive`')
          return true; // Found object with the key 'showArchive'
        }
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
      
      if (currentItem && currentItem.showCaseStudyArchive && currentItem.showCaseStudyArchive.archive) {
        const archiveItems = currentItem.showCaseStudyArchive.archive;
  
        archiveItems.forEach(archiveItem => {
          if (archiveItem._id) {
            acc.push(archiveItem._id);
          }
        });
        console.log(`Acc - ${JSON.stringify(acc)}`)
      }
      return acc;
    }, []);

  console.log(`BPC: ${blogPostsCategories} - ids: ${ids}`)
    return ids.length === 0 ? blogPostsCategories : ids;
  }

  result.data.allSanityPage.nodes.forEach(node => {
    console.info(`Type ${node?._type}`)

    // Check if the array has an object with the key 'showArchive'
    const hasKey = hasShowArchive(node?.pageBuilder);
    
    if (hasKey && node._type === "blogPostSection") {
      console.info(`Yes - blogPostSection`)
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
    if (hasKey && node._type === "caseStudySection") {
      console.info(`Yes - caseStudySection`)
      paginate({
        createPage,
        items: blogPosts,
        itemsPerPage: 3,
        pathPrefix: `/${node.slug.current}`,
        component: require.resolve(`./src/templates/caseStudyArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
        context: {
          id: node.id,
          slug: `${node.slug.current}`,
          node: node,
          postIds: getShowArchiveIds(node?.pageBuilder),
          caseStudyIds: getShowArchiveIds(node?.pageBuilder)
        },
      })
    }
    else {
      console.info(`Yes - Page`)
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
        navColor: node.navColor
      },
    })
  })

  caseStudies.forEach((node, index) => {
    createPage({
      path: `case-studies/${node.slug.current}`,
      component: require.resolve(`./src/templates/caseStudyTemplate.jsx`),
      context: {
        id: node.id,
        key: index,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        service: node.service,
        excerpt: node.excerpt,
      },
    })
  })

  teamMembers.forEach(node => {
    createPage({
      path: `team-members/${node.slug.current}`,
      component: require.resolve(`./src/templates/teamMemberTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.image,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
      },
    })
  })
  

}

