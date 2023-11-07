require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "upgrade"}`,
});

const isProd = process.env.NODE_ENV === "production"
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"

module.exports = {
  siteMetadata: {
    title: `Heligan Campsite`,
    description: `Heligan Campsite site. Be at home with nature.`,
    author: `@edwardwilson`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gatsby-cloud`
    },
    {
      resolve: `gatsby-plugin-sanity-image`,
      options: {
        // Sanity project info (required)
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        customImageTypes: ['SanityImageCaption', 'SanityCoverImage', 'SanityImageAlt'],
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
        watchMode: !isProd, // watchMode only in dev mode
        overlayDrafts: !isProd || previewEnabled, // drafts in dev & Gatsby Cloud Preview
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          precision: 6,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `heligan-campsite`,
        short_name: `heligan-campsite`,
        start_url: `/`,
        background_color: `#f6f6ee`,
        theme_color: `#f6f6ee`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
          endpoint: process.env.MAILCHIMP_LIST_ENDPOINT, // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'places',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allSanityPlace {
              nodes {
                title
                excerpt
                categories: placeCategories {
                  name
                }
                coverImage {
                  asset {
                    gatsbyImageData(width: 525, height: 323)
                  }
                }
                slug {
                  current
                }
                id
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'excerpt', 'categories'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title', 'excerpt', 'coverImage', 'categories'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allSanityPlace.nodes.map((node) => ({
            id: node.id,
            slug: node.slug.current,
            title: node.title,
            excerpt: node.excerpt,
            coverImage : node.coverImage,
            categories: node.categories


          })),
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        "/*": [
          "X-XSS-Protection: 1; mode=block",
          "X-Content-Type-Options: nosniff",
          "Referrer-Policy: same-origin",
          `Content-Security-Policy: frame-ancestors 'self' https://heligan-campsite.sanity.studio/`,
        ],
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `League Spartan`,
                variants: [`400`, `500`, `700`],
              },
            ],
            selfHosted: [
              {
                family: `Sentient-Bold`,
                urls: {
                  woff2: `../web/src/fonts/sentient/fonts/Sentient-Bold.woff2`,
                  woff: `../web/src/fonts/sentient/fonts/Sentient-Bold.woff`,
                  ttf: `../web/src/fonts/sentient/fonts/Sentient-Bold.ttf`,
                  //[format]: '/[filepath]/[filename],
                },
                //[cssProperty]: 'value',
              },
            ],
          },
        },
      },
    },
  ],
  partytownProxiedURLs: [`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`]
}
