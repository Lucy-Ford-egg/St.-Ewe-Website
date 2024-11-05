import groq from "groq"

// * Helpful - https://www.sanity.io/docs/query-cheat-sheet

export const LINK = `
link{
  _key,
  internal->{
    slug {
      current,
      _type
    },
    category-> {
      ...,
    },
    _type,
    id,             
  },
  external,
},
_key,
text
`
const TESTIMONIAL = `
  testimonialTile->{
    ...,
  }
`

const ILLUSTRATIONS = `
  layers->{
    ...,
  }
`

const ACCORDION = `
  accordion[]->{
    ...,
  }
`
const TEAM = `
  teamTiles[]->{
    ...,
  }
`
const HOTSPOT = `
  hotspotData->{
    ...,
    featureImage{
      asset->{
        ...,
      }
    },
    links[]{
      ${LINK},
    },
  }
`
export const PAGE_BUILDER = `
  pageBuilder[] {
    ...,
    'rawTitle': title,
    ${ACCORDION},
    ${TEAM},
    ${TESTIMONIAL},
    ${ILLUSTRATIONS},
    ${HOTSPOT},
}`

export const SITE_SETTINGS = groq`*[_type == "siteSettings"] {
  ...,
  text[]{...},
  footerDetails{
    links[]{
      ${LINK},
    },
  }
}`

export const NAV_QUERY = groq`*[slug.current == $slug][0] {

}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
   ...,
  ${PAGE_BUILDER},
}`

export const ALL_RECIPES = groq`*[_type ==  "recipes" && defined(coverImage)][0..4] {
  _id,
  title,
  ...,
  service->{name},
}`

export const RECIPES_BY_ID = groq`*[_type ==  "recipes && defined(coverImage)" && references($categoryId)] {
  _id,
  ...,
  service->{name},
}`

export const RECIPES_QUERY = groq`*[_type == "recipes" && slug.current == $slug][0] {
   ...,
  ${PAGE_BUILDER},
}`

export const CATEGORIES_QUERY = groq`*[_type ==  "recipes" && slug.current == $slug][0] {
  pageBuilder[] {
    ...,
    images[] { 
      asset->,
      hotspot{...},
      crop{...}
    },
    image {
      asset->,
      hotspot{...},
      crop{...}
    },
    links[]{
      ${LINK},
    },
    title[]{...},
    text[]{...},
    title,
    text,
    overlay,
    topPadding,
    leftAlign, 
    steps[]{
      title,
      description,
      involves,
      _type, 
    },
    showArchive{
      ...,
      archive[]->{...},  
    },
    showRecipesArchive{
      ...,
      archive[]->{
        ..., 
      },
    },
    teamTiles[]->{...},
    tileColor->{...},
    testimonialTiles[]->{
      cite{
        teamMemberCite->{
          name,
          position,
          image {
            asset->,
            hotspot{...},
            crop{...}
          },
        },
        externalCite{
          citeName,
          citeLocation,
          image {
            asset->,
            hotspot{...},
            crop{...}
          },
        },
      },
      "_rawQuoteText": quoteText,
    },
  },
  title,
  text,
  image {
    asset->,
    hotspot{...},
    crop{...}
  },

  mobileImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  textAlign,
  slug,
  companyDetails,
  person,
  _rawPerson,
  featuredMedia {
    asset->,
    hotspot{...},
    crop{...}
  },
  body[]{...},
  _id,
}`

export const TEAM_MEMBER_PAGE_QUERY = groq`*[_type == "teamMember" && slug.current == $slug][0] {
  ...,
  ${PAGE_BUILDER},
  title,
  text,
  image {
    asset->,
    hotspot{...},
    crop{...}
  },

  mobileImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  textAlign,
  slug,
  companyDetails,
  person,
  _rawPerson,
  featuredMedia {
    asset->,
    hotspot{...},
    crop{...}
  },
  bio[]{...},
  body[]{
    ...,
    file{
      ...,
      },
    },
  },
  _id,
}`

// Not currently used
// export const ALL_POSTS = groq`*[_type == "post"][0..8] |  order(date desc){
//   _id,
//   title,
//   ...,
//   category->{...},
//   person,
//   _rawPerson,
//   author->{...},
// }`

export const POSTS_BY_ID = groq`*[_type == "post" && references($categoryId)] | order(date desc)[0..7] {
  _id,
  ...,
  categories->{
    ...,
    slug,
  },
  author->{...},
  
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ...,
  ${PAGE_BUILDER},
}`
