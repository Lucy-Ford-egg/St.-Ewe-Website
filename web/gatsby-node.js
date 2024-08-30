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
    type category implements Node {
      name: String
    }
    type ShowArchive implements Node {
      setArchive: Boolean
      archive: [SanityCategories]
    }
    type showRecipiesArchive implements Node {
      setArchive: Boolean
      archive: [category]
    }
    type SanityPage implements Node {
      showArchive: ShowArchive
      showRecipiesArchive: showRecipiesArchive
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
    allSanityPage(filter: {slug: {current: {nin: ["blog", "recipies"]}}}) {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
    recipiesPage: allSanityPage(filter: {slug: {current: {in: "recipies"}}}) {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
    allSanityRecipies(filter: {coverImage: {_type: {eq: "image"}}}) {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
          ... on SanityRecipiesSection {
            _key
            _type
            showRecipiesArchive {
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
  const recipies = result.data?.allSanityRecipies.nodes || []
  const teamMembers = result.data?.allSanityTeamMember.nodes || []

  //const blogPages = result.data?.blogPages?.nodes || []

  const blogPostsCategories = blogPosts.map(({ category }) => category && category._id)
  const recipiesCategories = recipies.map(({ category }) => category && category._id)

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

  function getShowArchiverecipiesIds(pageBuilder, type) {
    //!
    const pageBuilderArray = pageBuilder || []; // Extract pageBuilder array
// console.log(`PageBuilder type: ${JSON.stringify(pageBuilder)}`)
    const ids = pageBuilderArray.reduce((acc, currentItem) => {
      // console.log(`Current Item: ${JSON.stringify(currentItem)}`)
      if (type === currentItem?._type) {
        // console.log(`recipies acc : ${JSON.stringify(currentItem) }`)
        if (currentItem && currentItem.showRecipiesArchive && currentItem.showRecipiesArchive.archive) {
          const archiveItems = currentItem.showRecipiesArchive.archive;
          
          archiveItems.forEach(archiveItem => {
            if (archiveItem._id) {
              acc.push(archiveItem._id);
            }
          });
        }
      }
      // console.log(`recipies acc : ${JSON.stringify(acc) }`)
      return acc;
    }, []);
    // console.log(`recipies ids : ${JSON.stringify(ids) }`)
    // console.log(`recipies ids.length : ${ids.length }`)

    return ids.length === 0 ? recipiesCategories : ids    
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
          recipiesIds: getShowArchiverecipiesIds(node?.pageBuilder, "recipiesSection"),
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
          recipiesIds: getShowArchiverecipiesIds(node?.pageBuilder, "recipiesSection"),
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
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
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
        // category: node.category,
        // excerpt: node.excerpt,
        // postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        // recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
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
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
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
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
      },
    })
  })

  result.data.recipiesPage.nodes.forEach(node => {
    paginate({
      createPage,
      items: recipies,
      itemsPerPage: 4,
      pathPrefix: `/${node.slug.current}`,
      component: require.resolve(`./src/templates/recipiesArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
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
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
      },
    })
  })

  recipies.forEach((node, index) => {
    createPage({
      path: `recipies/${node.slug.current}`,
      component: require.resolve(`./src/templates/recipiesTemplate.jsx`),
      context: {
        id: node.id,
        key: index,
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        category: node.category,
        excerpt: node.excerpt,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
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
        recipiesIds: getShowArchiverecipiesIds(node.pageBuilder, "recipiesSection")
      },
    })
  })


}

