require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "upgrade"}`,
});

const netlifyAdapter = require("gatsby-adapter-netlify").default;

const isProd = process.env.NODE_ENV === "production"
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"

module.exports = {
  adapter: netlifyAdapter({
    excludeDatastoreFromEngineFunction: false,
  }),
  headers: [
    {
      source: `/*`,
      headers: [
        {
          key: `X-Frame-Options: ALLOW-FROM`,
          value: `https://heligan-campsite.sanity.studio/`,
        },
        {
          key: `Content-Security-Policy: child-src`,
          value: `https://heligan-campsite.sanity.studio`,
        }
      ]
    }
  ],
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
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.GATSBY_FRONTEND,
      },
    },
    {
      resolve: `gatsby-theme-material-ui`,
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: `Merriweather`,
                variants: [`400`, `500`, `700`],
              },
              {
                family: `Open Sans`,
                variants: [`400`, `500`, `700`],
              },
            ],
          },
        },
      },
    },
  ],
  partytownProxiedURLs: [`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`]
}
