/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions
  const { data } = await graphql(`
    query SanityAllPage {
      allSanityPage {
        nodes {
          title
          slug {
            current
          }
        }
      }
      allSanityPlace {
        nodes {
          title
          slug {
            current
          }
        }
      }
      allSanityPost {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `)

  // Fetch your items (blog posts, categories, etc).
  const blogPosts = data.allSanityPost.nodes;

  // // Create blog post list pages
  // const postsPerPage = 2
  // const numPages = Math.ceil(data.allSanityPost.nodes.length / postsPerPage)

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: blogPosts, // An array of objects
    itemsPerPage: 4, // How many items you want per page
    pathPrefix: '/blog', // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve(`./src/templates/blog.js`), // Just like `createPage()`
    
  })

  data.allSanityPage.nodes.forEach(node => {
    console.log("Node", node.slug.current)
    node.slug.current !== "blog" &&
    createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/page-builder.js`),
      context: { slug: `${node.slug.current}` },
    })
  })
  data.allSanityPlace.nodes.forEach(node => {
    createPage({
      path: `places/${node.slug.current}`,
      component: require.resolve(`./src/templates/place-builder.js`),
      context: { slug: `${node.slug.current}` },
    })
  })

  // Array.from({ length: numPages }).forEach((_, i) => {
  //   actions.createPage({
  //     path: `/blog/${i}`,
  //     //path: `posts/${node.slug.current}`,
  //     component: require.resolve(`./src/templates/post-builder.js`),
  //     context: {
  //       limit: postsPerPage,
  //       skip: i * postsPerPage,
  //       numPages,
  //       currentPage: i + 1,
  //       slug: `${data.allSanityPost.nodes[i].slug.current}`,
  //     },
  //   })
  // })
}
