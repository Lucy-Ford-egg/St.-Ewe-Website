/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { paginate } = require("gatsby-awesome-pagination")
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
      slug: SanitySlug
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
    allSanityPage {
      nodes {
        id
        slug {
          current
        }
        archive {
          name
          _id
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
          _id
        }
      }
    }

    allSanityUnit {
      nodes {
        slug {
          current
        }
        _id
        summary
        _rawExtendedSummary(resolveReferences: {maxDepth: 20})
        links {
          asset {
            title
            url
            originalFilename
          }
        }
        name
        maxGrading
        maxOccupancy
        numberOfRooms
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
   const units = result.data?.allSanityUnit?.nodes || []
   //const blogPages = result.data?.blogPages?.nodes || []

  result.data.allSanityPage.nodes.forEach(node => {
    createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/pageTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        node: node,
        postIds: result.data?.allSanityPost?.nodes.map(({ category }) => category._id)
      },
    })
    if(node.archive.name?._id){
      node.archive.name._id.forEach(archivePage => {
        paginate({
          createPage,
          items: blogPosts,
          itemsPerPage: 1,
          pathPrefix: `/${node.slug.current}`,
          component: require.resolve(`./src/templates/blogArchiveTemplate.jsx`),
          context: {
            slug: node.slug.current,
            categoryArchive : node.archive?._id || null,
          }
        })
      })
      
    }
  })

  units.forEach(node => {
    node.slug && node.slug.current &&
    createPage({
      path: `holiday-homes/${node.slug.current}`,
      component: require.resolve(`./src/templates/unitTemplate.jsx`),
      context: {
        id: node.id,
        slug: `${node.slug.current}`,
        title: node.name,
        coverImage: node.mainImage,
        date: node.date,
        //categories: node.categories,
        excerpt: node.excerpt,
        summary: node.summary,
        unitId: node._id,
        extendedSummary: node._rawExtendedSummary,
        links: node.links
      },
    })
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

    // blogPages.forEach((blogPage) => {
    //   paginate({
    //     createPage,
    //     items: blogPosts,
    //     itemsPerPage: 1,
    //     pathPrefix: `/${blogPage.slug.current}`,
    //     component: require.resolve(`./src/templates/blogArchiveTemplate.jsx`),
    //     context: {
    //       slug: blogPage.slug.current,
    //       blogArchive: blogPage.blogArchive,
    //       categoryArchive : blogPage.categoryArchive?.name || null,
    //     }
    //   })
    // })

   ////($slug: String!, $postIds: [String!])
   //"postIds": ["5e419fc4-7e9c-4d70-9e3b-bae5e7beb97e", "d6ef20c1-92ba-4ffc-8b22-1161c18e70a2"]

}

