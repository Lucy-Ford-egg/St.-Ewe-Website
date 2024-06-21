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
    type ShowCaseStudyArchive implements Node {
      setArchive: Boolean
      archive: [SanityServices]
    }
    type SanityPage implements Node {
      showArchive: ShowArchive
      showCaseStudyArchive: ShowCaseStudyArchive
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
    allSanityPage(filter: {slug: {current: {nin: ["blog", "case-studies"]}}}) {
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
              setArchive
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
              setArchive
            }
          }
        }
      }
    }
    blogPage: allSanityPage(filter: {slug: {current: {in: "blog"}}}) {
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
              setArchive
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
              setArchive
            }
          }
        }
      }
    }
    caseStudyPage: allSanityPage(filter: {slug: {current: {in: "case-studies"}}}) {
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
              setArchive
            }
          }
          ... on SanityCaseStudySection {
            _key
            _type
            disableSummary
            asCarousel
            showCaseStudyArchive {
              archive {
                name
                _id
              }
              setArchive
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
        pageBuilder{
          ... on SanityBlogSection {
            _key
            _type
            showArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
          ... on SanityCaseStudySection {
            _key
            _type
            disableSummary
            asCarousel
            showCaseStudyArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
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
          pageBuilder{
          ... on SanityBlogSection {
            _key
            _type
            showArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
          ... on SanityCaseStudySection {
            _key
            _type
            disableSummary
            asCarousel
            showCaseStudyArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
        }
      }
    }
    allSanityPost(sort: {date: DESC}) {
      nodes {
        navColor{
          value
        }
        tileColor{
          value
          label
        }
        title
        slug {
          current
        }
        category {
          name
          _id
          slug {
            current
          }
        }
        pageBuilder{
          ... on SanityBlogSection {
            _key
            _type
            showArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
          ... on SanityCaseStudySection {
            _key
            _type
            disableSummary
            asCarousel
            showCaseStudyArchive {
              archive {
                name
                _id
              }
              setArchive
            }
          }
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
  const caseStudyCategories = caseStudies.map(({ service }) => service && service._id)

  function getShowArchiveBlogIds(pageBuilder, type) {
    const pageBuilderArray = pageBuilder || []; // Extract pageBuilder array

    const ids = pageBuilderArray.reduce((acc, currentItem) => {

      if (type === currentItem?._type) {
        if (currentItem && currentItem.showArchive && currentItem.showArchive.archive) {
          const archiveItems = currentItem.showArchive.archive;

          archiveItems.forEach(archiveItem => {
            if (archiveItem._id) {
              acc.push(archiveItem._id);
            }
          });
        }
      }
      return acc;
    }, []);

    //console.table(`Blog IDs: ${blogPostsCategories} - ids: ${ids}`)
    return ids.length === 0 ? blogPostsCategories : ids
  }

  function getShowArchiveCaseStudyIds(pageBuilder, type) {
    //!
    const pageBuilderArray = pageBuilder || []; // Extract pageBuilder array
// console.log(`PageBuilder type: ${JSON.stringify(pageBuilder)}`)
    const ids = pageBuilderArray.reduce((acc, currentItem) => {
      // console.log(`Current Item: ${JSON.stringify(currentItem)}`)
      if (type === currentItem?._type) {
        // console.log(`CaseStudy acc : ${JSON.stringify(currentItem) }`)
        if (currentItem && currentItem.showCaseStudyArchive && currentItem.showCaseStudyArchive.archive) {
          const archiveItems = currentItem.showCaseStudyArchive.archive;
          
          archiveItems.forEach(archiveItem => {
            if (archiveItem._id) {
              acc.push(archiveItem._id);
            }
          });
        }
      }
      // console.log(`CaseStudy acc : ${JSON.stringify(acc) }`)
      return acc;
    }, []);
    // console.log(`CaseStudy ids : ${JSON.stringify(ids) }`)
    // console.log(`CaseStudy ids.length : ${ids.length }`)

    return ids.length === 0 ? caseStudyCategories : ids    
  }

  result.data.allSanityPage.nodes.forEach(node => {
    if (node.slug.current === "home-page") {
      createPage({
        path: `/`,
        component: require.resolve(`./src/templates/pageTemplate.jsx`),
        context: {
          id: node.id,
          slug: `${node.slug.current}`,
          node: node,
          postIds: getShowArchiveBlogIds(node?.pageBuilder, "blogSection"),
          caseStudyIds: getShowArchiveCaseStudyIds(node?.pageBuilder, "caseStudySection"),
          navColor: node.navColor
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
          postIds: getShowArchiveBlogIds(node?.pageBuilder, "blogSection"),
          caseStudyIds: getShowArchiveCaseStudyIds(node?.pageBuilder, "caseStudySection"),
          navColor: node.navColor
        },
      })
    }
  })

  result.data.blogPage.nodes.forEach(node => {
    paginate({
      createPage,
      items: blogPosts,
      itemsPerPage: 12,
      pathPrefix: `/${node.slug.current}`,
      component: require.resolve(`./src/templates/blogArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })
  })

  // Paginate Categories

  // Function to filter posts by category
function filterPostsByCategory(posts) {
  const categories = {};

  posts.forEach(post => {
    const categorySlug = post.category.slug.current;

    if (!categories[categorySlug]) {
      categories[categorySlug] = [];
    }

    categories[categorySlug].push(post);
  });

  return categories;
}

// Usage
const posts = result.data.allSanityPost.nodes;
const categorizedPosts = filterPostsByCategory(posts);

console.log(`Categorized Posts: ${categorizedPosts}`)

Object.keys(categorizedPosts).forEach(categoryName => {
  console.log(`Category: ${categoryName}`);

  categorizedPosts[categoryName].forEach(node => {
    console.log(`CatNode: ${JSON.stringify(node)}`);
    createPage({
      path: `blog/category/${node.category.slug.current}`,
      component: require.resolve(`./src/templates/categoryTemplate.jsx`),
      context: {
        id: node.id,
        key: node.category.slug.current,
        slug: `${node.category.slug.current}`,
        // title: node.title,
        // coverImage: node.coverImage,
        // date: node.date,
        // service: node.service,
        // excerpt: node.excerpt,
        // postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        // caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })
    paginate({
      createPage,
      items: categorizedPosts[categoryName],
      itemsPerPage: 12,
      pathPrefix: `/blog/category/${node.category.slug.current}`,
      component: require.resolve(`./src/templates/categoryArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.category.slug.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })

  });
});

  result.data.blogPage.nodes.forEach(node => {
    paginate({
      createPage,
      items: blogPosts,
      itemsPerPage: 12,
      pathPrefix: `/${node.slug.current}`,
      component: require.resolve(`./src/templates/blogArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })
  })

  result.data.caseStudyPage.nodes.forEach(node => {
    paginate({
      createPage,
      items: caseStudies,
      itemsPerPage: 4,
      pathPrefix: `/${node.slug.current}`,
      component: require.resolve(`./src/templates/caseStudyArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })
  })

  blogPosts.forEach(node => {
    createPage({
      path: `blog/${node.category.slug.current}/${node.slug.current}`,
      component: require.resolve(`./src/templates/postTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        navColor: node.navColor,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
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
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
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
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        caseStudyIds: getShowArchiveCaseStudyIds(node.pageBuilder, "caseStudySection")
      },
    })
  })


}

