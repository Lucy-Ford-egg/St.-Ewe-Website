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
      _id: Int
    }
    type ShowArchive implements Node {
      setArchive: Boolean
      archive: [category]
    }
    type showRecipesArchive implements Node {
      setArchive: Boolean
      archive: [category]
    }
    type SanityPage implements Node {
      showArchive: ShowArchive
      showRecipesArchive: showRecipesArchive
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
    allSanityPage(filter: {slug: {current: {nin: ["news", "recipes"]}}}) {
      nodes {
        _type
        id
        slug {
          current
        }
        navColor{
          value
        }
        title
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
          ... on SanityRecipesSection {
            _key
            _type
            showRecipesArchive {
              archive {
                category {
                  name
                }
                _id
              }
              setArchive
            }
          }
        }
      }
    }
    blogPage: allSanityPage(filter: {slug: {current: {in: "news"}}}) {
      nodes {
        _type
        id
        slug {
          current
        }
        navColor{
          value
        }
        title
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
          ... on SanityRecipesSection {
            _key
            _type
            showRecipesArchive {
              archive {
                category {
                  name
                }
                _id
              }
              setArchive
            }
          }
        }
      }
    }
    recipePage: allSanityPage(filter: {slug: {current: {in: "recipes"}}}) {
      nodes {
        _type
        id
        slug {
          current
        }
        navColor{
          value
        }
        title
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
          ... on SanityRecipesSection {
            _key
            _type
            showRecipesArchive {
              archive {
                category {
                  name
                }
                _id
              }
              setArchive
            }
          }
        }
      }
    }
    allSanityRecipes(filter: {featuredMedia: {_type: {eq: "image"}}}) {
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
          ... on SanityRecipesSection {
            _key
            _type
            showRecipesArchive {
              archive {
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
        _rawExcerpt(resolveReferences: {maxDepth: 10})
        _rawContent(resolveReferences: {maxDepth: 10})
        title
        slug {
          current
        }
        featuredMedia {
          asset {
            _id
            gatsbyImageData
          }
          hotspot {
            x
            y
            width
            height
          }
          crop {
            bottom
            left
            right
            top
          }
        }
        categories {
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
          ... on SanityRecipesSection {
            _key
            _type
            showRecipesArchive {
              archive {
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
  const recipes = result.data?.allSanityRecipes.nodes || []

  //const blogPages = result.data?.blogPages?.nodes || []

  const blogPostsCategories = blogPosts.map(({ categories }) => categories)
  const recipeCategories = recipes.map(({ category }) => category && category._id)

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
    return ids.length === 0 ? [] : ids
  }

  function  getShowArchiveRecipesIds(pageBuilder, type) {
    //!
    const pageBuilderArray = pageBuilder || []; // Extract pageBuilder array
// console.log(`PageBuilder type: ${JSON.stringify(pageBuilder)}`)
    const ids = pageBuilderArray.reduce((acc, currentItem) => {
      // console.log(`Current Item: ${JSON.stringify(currentItem)}`)
      if (type === currentItem?._type) {
        // console.log(`Recipe acc : ${JSON.stringify(currentItem) }`)
        if (currentItem && currentItem.showRecipesArchive && currentItem.showRecipesArchive.archive) {
          const archiveItems = currentItem.showRecipesArchive.archive;
          
          archiveItems.forEach(archiveItem => {
            if (archiveItem._id) {
              acc.push(archiveItem._id);
            }
          });
        }
      }
      // console.log(`Recipe acc : ${JSON.stringify(acc) }`)
      return acc;
    }, []);
    // console.log(`Recipe ids : ${JSON.stringify(ids) }`)
    // console.log(`Recipe ids.length : ${ids.length }`)

    return ids.length === 0 ? recipeCategories : ids    
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
          recipeIds:  getShowArchiveRecipesIds(node?.pageBuilder, "recipesSection"),
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
          recipeIds:  getShowArchiveRecipesIds(node?.pageBuilder, "recipesSection"),
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
        recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
      },
    })
  })

  // Paginate Categories

  // Function to filter posts by category
function filterPostsByCategory(posts) {
  const categories = {};

  posts.forEach(post => {
    const categorySlug = post?.categories?.slug?.current;

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

// console.log(`Categorized Posts: ${categorizedPosts}`)

Object.keys(categorizedPosts).forEach(categoryName => {
  //console.log(`Category: ${categoryName}`);

  categorizedPosts[categoryName].forEach(node => {
    // console.log(`CatNode: ${JSON.stringify(node)}`);
    createPage({
      path: `news/category/${node.categories?.slug?.current}`,
      component: require.resolve(`./src/templates/categoryTemplate.jsx`),
      context: {
        id: node.id,
        key: node.categories?.slug?.current,
        slug: `${node.categories?.slug?.current}`,
        // title: node.title,
        // coverImage: node.coverImage,
        // date: node.date,
        // category: node.category,
        // excerpt: node.excerpt,
        // postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        // recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
      },
    })
    paginate({
      createPage,
      items: categorizedPosts[categoryName],
      itemsPerPage: 12,
      pathPrefix: `/news/category/${node?.categories?.slug?.current}`,
      component: require.resolve(`./src/templates/categoryArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.categories?.slug?.current}`,
        node: node,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
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
        recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
      },
    })
  })

  // result.data.recipePage.nodes.forEach(node => {
  //   paginate({
  //     createPage,
  //     items: recipes,
  //     itemsPerPage: 4,
  //     pathPrefix: `/${node.slug.current}`,
  //     component: require.resolve(`./src/templates/recipeArchiveTemplate.jsx`), // component: require.resolve(`./src/templates/blogArchivePaginateTemplate.jsx`),
  //     context: {
  //       id: node.id,
  //       slug: `${node.slug.current}`,
  //       node: node,
  //       postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
  //       recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
  //     },
  //   })
  // })

  blogPosts.forEach(node => {
    // console.log(`Blog - ${JSON.stringify(node)}`)
    createPage({
      path: `news/${node.categories[0]?.slug?.current}/${node?.slug?.current}`,
      component: require.resolve(`./src/templates/postTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug?.current}`,
        title: node.title,
        featuredMedia: node.featuredMedia,
        date: node.date,
        categories: node.categories,
        navColor: node.navColor,
        postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
        recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
      },
    })
  })

  // recipes.forEach((node, index) => {
  //   createPage({
  //     path: `Recipe/${node.slug.current}`,
  //     component: require.resolve(`./src/templates/recipesTemplate.jsx`),
  //     context: {
  //       id: node.id,
  //       key: index,
  //       slug: `${node.slug.current}`,
  //       title: node.title,
  //       coverImage: node.coverImage,
  //       date: node.date,
  //       category: node.category,
  //       excerpt: node.excerpt,
  //       postIds: getShowArchiveBlogIds(node.pageBuilder, "blogSection"),
  //       recipeIds:  getShowArchiveRecipesIds(node.pageBuilder, "recipesSection")
  //     },
  //   })
  // })
}

