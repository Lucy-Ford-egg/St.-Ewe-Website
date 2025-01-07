require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "upgrade"}`,
})

const netlifyAdapter = require("gatsby-adapter-netlify").default

const isProd = process.env.NODE_ENV === "production"
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"

const siteUrl = process.env.GATSBY_FRONTEND || `https://steweeggs.com/`

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
          value: `https://st-ewe.sanity.studio/`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `https://st-ewe.sanity.studio/`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `https://vimeo.com`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `https://player.vimeo.com`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `https://fresnel.vimeocdn.com`,
        },
        {
          key: `Content-Security-Policy`,
          value: `form-action 'self' https://google.com;`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `js-eu1.hs-scripts.com`,
        },
      ],
    },
  ],
  siteMetadata: {
    title: `St Ewe Eggs`,
    description: `A love of eggs. A passion for welfare. An obsession for good food. We are St. Ewe Eggs, an award-winning, family business, based in Cornwall.`,
    author: `@edwardwilson`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
    },
    {
      resolve: `gatsby-plugin-brotli`,
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allSanityPage {
            nodes {
              _updatedAt
              _id
              slug {
                current
              }
            }
          }
          allSanityPost(sort: {date: DESC}) {
            nodes {
              _updatedAt
              _id
              slug {
                current
              }
            }
          }
          allSanityTeamMember {
            nodes {
              _updatedAt
              _id
            }
          }
          allSanityRecipes {
            nodes {
              _updatedAt
              _id
              slug {
                current
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allSanityPost: { nodes: allPosts },
          allSanityTeamMember: { nodes: allTeams },
          allSanityRecipes: { nodes: allCaseStudies },
        }) => {
          const caseStudiesNodeMap = allCaseStudies.reduce((acc, node) => {
            const { slug } = node
            acc[`/recipe/${slug?.current}`] = node

            return acc
          }, {})
          // console.log(`unitsNodeMap - ${JSON.stringify(unitsNodeMap)}`)

          const postsNodeMap = allPosts.reduce((acc, node) => {
            const { slug } = node
            acc[
              `/news/${node?.reference?.category?.slug?.current}/${slug?.current}`
            ] = node

            return acc
          }, {})
          // console.log(`postsNodeMap - ${JSON.stringify(postsNodeMap)}`)

          const combined = [caseStudiesNodeMap, postsNodeMap]

          return allPages.map(page => {
            return { ...page, ...combined[page.path] }
          })
        },
        serialize: ({ path, _updatedAt }) => {
          return {
            url: path,
            lastmod: _updatedAt,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-sanity-image`,
      options: {
        // Sanity project info (required)
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        customImageTypes: [
          "SanityImageCaption",
          "SanityCoverImage",
          "SanityImageAlt",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleConsent: {
          adStorage: "gatsby-gdpr-google-ad-storage", // default
          analyticsStorage: "gatsby-gdpr-google-analytics-storage", // default
          functionalityStorage: "gatsby-gdpr-google-functionality-storage", // default
          personalizationStorage: "gatsby-gdpr-google-personalization-storage", // default
          adUserData: "gatsby-gdpr-google-ad-user-data", // default
          adPersonalization: "gatsby-gdpr-google-ad-personalization", // default
          waitForUpdate: 500, // default
        },
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // leave empty if you want to disable the tracker
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: process.env.GOOGLE_TAG_MANAGER_TRACKING_ID, // leave empty if you want to disable the tracker
          dataLayerName: "dataLayer", // default
        },
        googleTag: {
          trackingIds: ["YOUR_GOOGLE_TAG_IDS"],
        },
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-facebook-pixel", // default
        },
        tikTokPixel: {
          pixelId: process.env.TIKTOK_PIXEL_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-tiktok-pixel", // default
        },
        // hotjar: {
        //   hjid: "YOUR_HOTJAR_ID",
        //   hjsv: "YOUR_HOTJAR_SNIPPET_VERSION",
        //   cookieName: "gatsby-gdpr-hotjar", // default
        // },
        // linkedin: {
        //   trackingId: "YOUR_LINKEDIN_TRACKING_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-linkedin", // default
        // },
        // hubspot: {
        //   trackingId: "YOUR_HUBSPOT_TRACKING_ID", // leave empty if you want to disable the tracker
        //   cookieName: "gatsby-gdpr-hubspot", // default
        // },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
        iframeSandbox: "allow-forms allow-scripts allow-same-origin",
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
        graphqlTag: "default",
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
        name: `st-ewe-eggs`,
        short_name: `st-ewe-eggs`,
        start_url: `/`,
        background_color: `F3F3F2`,
        theme_color: `F3F3F2`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: process.env.MAILCHIMP_LIST_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
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
                family: `Roboto`,
                variants: [`400`],
              },
              {
                family: `Roboto Serif`,
                variants: [`400`],
              },
              {
                family: `Roboto Slab`,
                variants: [`300`, `400`, `500`],
              },
              {
                family: `Roboto Condensed`,
                variants: [`900`],
              },
            ],
            selfHosted: [
              {
                family: `Colby Narrow`,
                urls: {
                  woff2: `../web/src/assets/fonts/colby-narrow/colby-nrbld-webfont.woff2`,
                  woff: `../web/src/assets/fonts/colby-narrow/colby-nrbld-webfont.woff`,
                },
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: process.env.GOOGLE_TAG_MANAGER_TRACKING_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-tagmanager", // default
          dataLayerName: "dataLayer", // default
        },
        facebookPixel: {
          pixelId: process.env.META_PIXEL_ID, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-facebook-pixel", // default
        },
        tikTokPixel: {
          pixelId: "YOUR_TIKTOK_PIXEL_ID", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-tiktok-pixel", // default
        },
        hotjar: {
          hjid: "YOUR_HOTJAR_ID",
          hjsv: "YOUR_HOTJAR_SNIPPET_VERSION",
          cookieName: "gatsby-gdpr-hotjar", // default
        },
        linkedin: {
          trackingId: "YOUR_LINKEDIN_TRACKING_ID", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-linked-in", // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        // String value for your clarity project id
        // Project id is found in your clarity dashboard url
        // https://clarity.microsoft.com/projects/view/{clarity_project_id}/
        clarity_project_id: process.env.GATSBY_MICROSOFT_CLARITY_PROJECT_ID,
        // Boolean value for enabling clarity while developing
        // true will enable clarity tracking code on both development and production environments
        // false will enable clarity tracking code on production environment only
        enable_on_dev_env: true,
      },
    },
  ],
  partytownProxiedURLs: [
    `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_MANAGER_TRACKING_ID}`,
  ],
}
