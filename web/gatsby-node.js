/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.createPages = async function ({ actions, graphql }) {
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
  data.allSanityPage.nodes.forEach(node => {
    console.log("Node", node.slug.current)
    actions.createPage({
      path: node.slug.current,
      component: require.resolve(`./src/templates/page-builder.js`),
      context: { slug: node.slug.current },
    })
  })
  data.allSanityPlace.nodes.forEach(node => {

    actions.createPage({
      path: `places/${node.slug.current}`,
      component: require.resolve(`./src/templates/place-builder.js`),
      context: { slug: `${node.slug.current}` },
    })
  })
  data.allSanityPost.nodes.forEach(node => {

    actions.createPage({
      path: `posts/${node.slug.current}`,
      component: require.resolve(`./src/templates/post-builder.js`),
      context: { slug: `${node.slug.current}` },
    })
  })
}
