/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { paginate } = require('gatsby-awesome-pagination');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type categories implements Node {
      name: String
    }
  `
  createTypes(typeDefs)
}


exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions
  const { data } = await graphql(`
    query SanityAllData {
      allSanityPage(filter: {slug: {current: {nin: ["features-gallery","blog", "the-list"]}}}) {
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
          coverImage {
            asset {
              gatsbyImageData(width: 525, height: 323)
              altText
            }
          }
          date(formatString: "M MMM YYYY")
          categories: placeCategories {
            name
          }
          excerpt
        }
      }
      allSanityPost {
        nodes {
          title
          slug {
            current
          }
          coverImage {
            asset {
              gatsbyImageData(width: 525, height: 323)
              altText
            }
          }
          date(formatString: "M MMM YYYY")
          categories {
            name
          }
          excerpt
        }
      }
      allSanityFeature {
        nodes {
          title
          slug {
            current
          }
          coverImage {
            asset {
              gatsbyImageData(width: 525, height: 323)
              altText
            }
          }
          date(formatString: "M MMM YYYY")
          categories {
            name
          }
          excerpt
        }
      }
    }
  `)

  // Fetch your items (blog posts, categories, etc).
  const blogPosts = data.allSanityPost.nodes;
  const featurePosts = data.allSanityFeature.nodes;
  const placePosts = data.allSanityPlace.nodes;

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: blogPosts, // An array of objects
    itemsPerPage: 4, // How many items you want per page
    pathPrefix: '/blog', // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve(`./src/templates/blog.js`), // Just like `createPage()`
    context: { 
      features: featurePosts,
    },
  })

  blogPosts.forEach(node => {
    createPage({
      path: `blog/${node.slug.current}`,
      component: require.resolve(`./src/templates/post-builder.js`),
      context: { 
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
        allPosts: blogPosts,
        allFeatures: featurePosts,
      },
    })
  })

  
  paginate({
    createPage,
    items: featurePosts,
    itemsPerPage: 4,
    pathPrefix: '/features-gallery',
    component: require.resolve(`./src/templates/features-gallery.js`),
    context: { posts: blogPosts },
  })

  featurePosts.forEach(node => {
    createPage({
      path: `features-gallery/${node.slug.current}`,
      component: require.resolve(`./src/templates/feature-builder.js`),
      context: { 
        slug: `${node.slug.current}`,
        title: node.title,
        coverImage: node.coverImage,
        date: node.date,
        categories: node.categories,
        excerpt: node.excerpt,
        allPosts: blogPosts,
        allFeatures: featurePosts,
      },
    })
  })

  data.allSanityPage.nodes.forEach(node => {
    createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/page-builder.js`),
      context: { 
        slug: `${node.slug.current}`,
        allPosts: blogPosts,
        allFeatures: featurePosts,
      },
    })
  })

  paginate({
    createPage,
    items: placePosts,
    itemsPerPage: 100,
    pathPrefix: '/the-list',
    component: require.resolve(`./src/templates/places-list.js`),
    context: { posts: blogPosts },
  })

  placePosts.forEach(node => {
    createPage({
      path: `the-list/${node.slug.current}`,
      component: require.resolve(`./src/templates/place-builder.js`),
      context: { 
        slug: `${node.slug.current}`,
        allPosts: blogPosts,
        allFeatures: featurePosts,
      },
    })
  })

}
