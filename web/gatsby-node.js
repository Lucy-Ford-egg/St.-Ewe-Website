/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { paginate } = require("gatsby-awesome-pagination")
// const express = require('express');


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type categories implements Node {
      name: String
    }
    type SanityFeature implements Node {
      metaTitle: String
      metaDescription: String
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
  `
  createTypes(typeDefs)
}

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions
  const { data } = await graphql(`
    query SanityAllData {
      allSanityPage(filter: {slug: {current: {nin: ["blog", "features-gallery", "the-list" ]}}}) {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      allSanityPost {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      allSanityPlace {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      allSanityFeature {
        nodes {
          title
          id
          slug {
            current
          }
        }
      }
    }
  `)
   
  // Fetch your items (blog posts, categories, etc).
  const blogPosts = data?.allSanityPost?.nodes || []
  const featurePosts = data?.allSanityFeature?.nodes || []
  const placePosts = data?.allSanityPlace?.nodes || []

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: blogPosts, // An array of objects
    itemsPerPage: 12, // How many items you want per page
    pathPrefix: "/blog", // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve(`./src/templates/postPageBuilder.jsx`), // Just like `createPage()`
    context: {
      slug: "blog",
      features: featurePosts,
      showPagination: true,
    },
  })

  blogPosts.forEach(node => {
    createPage({
      path: `blog/${node.slug.current}`,
      component: require.resolve(`./src/templates/postBuilder.jsx`),
      context: {
        id: node.id,
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
    itemsPerPage: 2,
    pathPrefix: "/features-gallery",
    component: require.resolve(`./src/templates/featuresPageBuilder.jsx`),
    context: { 
      slug: "features-gallery",
      posts: blogPosts },
  })

  featurePosts.forEach(node => {
    createPage({
      path: `features-gallery/${node.slug.current}`,
      component: require.resolve(`./src/templates/featuresBuilder.jsx`),
      context: {
        id: node.id,
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

  data?.allSanityPage?.nodes.forEach(node => {
    createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/pageBuilder.jsx`),
      context: {
        id: node.id,
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
    pathPrefix: "/the-list",
    component: require.resolve(`./src/templates/pageBuilder.jsx`),
    context: { 
      slug: "the-list",
      posts: blogPosts },
      showPagination: true,
  })

  placePosts.forEach(node => {
    createPage({
      path: `places/${node.slug.current}`,
      component: require.resolve(`./src/templates/placeBuilder.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        allPosts: blogPosts,
        allFeatures: featurePosts,
      },
    })
  })
}

