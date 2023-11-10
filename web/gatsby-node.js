/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// const { paginate } = require("gatsby-awesome-pagination")
// // const express = require('express');


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type categories implements Node {
      name: String
    }
    type SanityPost implements Node {
      metaTitle: String
      metaDescription: String
    }
    type SanityPlace implements Node {
      metaTitle: String
      metaDescription: String
    }
    type SanityImageAsset implements Node {
      altText: String
    }
    type BallotSetup {
      showBallot: Boolean
      ballotUrl: String
    }
    type SanitySiteSettings implements Node {
      ballotSetup: BallotSetup
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async function ({ graphql, actions, reporter }) {
  const { createPage } = actions
  const result = await graphql(`
  query SanityAllData {
    allSanityPage(filter: {slug: {current: {nin: ["blog", "the-list"]}}}) {
      nodes {
        id
        slug {
          current
        }
        pageTitle
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
        }
        excerpt
        image: coverImage {
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

  result.data.allSanityPage.nodes.forEach(node => {
    createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/pageTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        blogPosts
      },
    })
  })

  //   const placePosts = data?.allSanityPlace?.nodes || []

    // Create your paginated pages
    // paginate({
    //   createPage, // The Gatsby `createPage` function
    //   items: blogPosts, // An array of objects
    //   itemsPerPage: 12, // How many items you want per page
    //   pathPrefix: "/blog", // Creates pages like `/blog`, `/blog/2`, etc
    //   component: require.resolve(`./src/templates/postPageBuilder.jsx`), // Just like `createPage()`
    //   context: {
    //     slug: "blog",
    //     showPagination: true,
    //   },
    // })

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

  

  //   paginate({
  //     createPage,
  //     items: placePosts,
  //     itemsPerPage: 100,
  //     pathPrefix: "/the-list",
  //     component: require.resolve(`./src/templates/pageBuilder.jsx`),
  //     context: { 
  //       slug: "the-list",
  //       posts: blogPosts },
  //       showPagination: true,
  //   })

  //   placePosts.forEach(node => {
  //     createPage({
  //       path: `places/${node.slug.current}`,
  //       component: require.resolve(`./src/templates/placeBuilder.jsx`),
  //       context: {
  //         id: node.id,
  //         slug: `${node.slug.current}`,
  //         allPosts: blogPosts,
  //       },
  //     })
  //   })
}

