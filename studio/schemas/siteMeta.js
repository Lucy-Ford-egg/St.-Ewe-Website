// import { openGraph } from "../schemas/openGraph";

export default {
  type: "document",
  name: "siteMeta",
  title: "Site Configuration",
  fieldsets: [
    { name: "google", title: "Google Analytics" },
  ],
  groups: [
    {
      name: "meta",
      title: "Site Info",
      default: true
    },
    {
      name: "og",
      title: "Social Share Info",
    },
    // {
    //   name: "manifest",
    //   title: "Web App Settings",
    //   hidden: ({ document }: {  document: {
    //     [key]: never;
    //   }}) => !(document.isPwa)
    // },
    {
      name: "google",
      title: "Google Config",
      // hidden: ({ document }: {  document: {
      //   [key]: never;
      // }}) => !(document.isGoogleAnalyticsEnabled)
    },
  ],
  fields: [
    {
    type: 'string',
    name: 'metaTitle',
    title: 'Meta Title',
    group: ['meta'],
    description: 'The title tag is the first HTML element that specifies what your web page is about. Title tags are important for SEO and visitors because they appear in the search engine results page (SERP) and in browser tabs.'
    // fieldset: "optional"
  },
  {
    type: "text",
    name: "metaDescription",
    title: "Meta Description",
    group: ['meta'],
    description: 'A meta description is an HTML element that sums up the content on your web page. Search engines typically show the meta description in search results below your title tag. Google does not use the meta description as a ranking signal. However, it still has a massive effect on your page`s click-through rate (CTR) because it appears in search results and informs users what your page is about.',
  },
  // {
  //   type: 'url',
  //   title: 'URL',
  //   name: 'url',
  //   description: 'Most likely either the url of the page or its canonical url',
  //   validation: (Rule) => Rule.required(),
  //   group: ['og', 'meta'],
  //   // fieldset: "basic"
  // },
  // {
  //   type: 'string',
  //   title: 'Page Title',
  //   name: 'ogTitle',
  //   description:
  //     'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
  //   validation: (Rule) => Rule.required(),
  //   // fieldset: "basic"
  // },
  // {
  //   type: 'image',
  //   title: 'Image',
  //   name: 'ogImage',
  //   description:
  //     'URL of the image that should be used in social media previews. If you define this, you must define two other OG basic properties as well: title and type.',
  //   validation: (Rule) => Rule.required(),
  //   group: ['og'],
  //   // fieldset: "basic"
  // },
    // {
    //   type: "text",
    //   name: "description",
    //   title: "Describe This Site",
    //   group: ["meta", "og"]
    // },
    // {
    //   type: "boolean",
    //   name: "isPwa",
    //   title: "should this site be installable like an app?",
    //   group: [
    //     "meta"
    //   ],
    //   initialValue: false,
    //   options: {
    //     layout: "checkbox"
    //   }
    // },
    // {
    //   type: "boolean",
    //   name: "isGoogleAnalyticsEnabled",
    //   title: "Enable Google Analytics?",
    //   group: ["meta", "google"],
    //   initialValue: false,
    //   options: {
    //     layout: "checkbox"
    //   }
    // },
    // {
    //   type: "string",
    //   name: "googleanalyticsId",
    //   title: "Google Analytics ID",
    //   fieldset: "google",
    //   group: ["meta", "google"],
    // },
    // {
    //   type: "string",
    //   name: "googleSiteVerificationId",
    //   title: "Google site Verification ID",
    //   fieldset: "google",
    //   group: ["meta", "google"],
    // },
    // {
    //   type: "manifest",
    //   title: "Web App Features",
    //   name: "manifest",
    //   group: "manifest"
    // }
  ],
  initialValue: {
    isPwa: false,
    isGoogleAnalyticsEnabled: false,
  }
};