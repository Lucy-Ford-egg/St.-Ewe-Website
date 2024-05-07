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
          value: `https://taylormoney.sanity.studio`,
        },
        {
          key: `Content-Security-Policy: frame-src`,
          value: `https://taylormoney.sanity.studio`,
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
        }
      ]
    }
  ],
  siteMetadata: {
    title: `Taylor Money`,
    description: `Taylor Money Wealth Management. An Asset for life.`,
    author: `@edwardwilson`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gatsby-cloud`
    },
    {
      resolve: `gatsby-plugin-brotli`,
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
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
            selfHosted: [
              {
                family: `Open Sans`,
                urls: {
                  woff2: `../web/src/assets/fonts/open-sans/opensans-regular-webfont.woff2`,
                  woff: `../web/src/assets/fonts/open-sans/opensans-regular-webfont.woff`,
                },
              },
              {
                family: `Open Sans SemiBold`,
                urls: {
                  woff2: `../web/src/assets/fonts/open-sans/opensans-semibold-webfont.woff2`,
                  woff: `../web/src/assets/fonts/open-sans/opensans-semibold-webfont.woff`,
                },
              },
              {
                family: `Merriweather Regular`,
                urls: {
                  woff2: `../web/src/assets/fonts/merriweather/merriweather-regular-webfont.woff2`,
                  woff: `../web/src/assets/fonts/merriweather/merriweather-regular-webfont.woff`,
                },
              },
              {
                family: `Merriweather Bold`,
                urls: {
                  woff2: `../web/src/assets/fonts/merriweather/merriweather-bold-webfont.woff2`,
                  woff: `../web/src/assets/fonts/merriweather/merriweather-bold-webfont.woff`,
                },
              },
            ]
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false // default
        },
        googleTagManager: {
          trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },
        tikTokPixel: {
          pixelId: 'YOUR_TIKTOK_PIXEL_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-tiktok-pixel', // default
        },
        hotjar: {
          hjid: 'YOUR_HOTJAR_ID',
          hjsv: 'YOUR_HOTJAR_SNIPPET_VERSION',
          cookieName: 'gatsby-gdpr-hotjar', // default
        },
        linkedin: {
          trackingId: 'YOUR_LINKEDIN_TRACKING_ID', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-linked-in', // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
  ],
  partytownProxiedURLs: [`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`]
}
