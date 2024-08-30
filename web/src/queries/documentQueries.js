import groq from 'groq'

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

export const PAGE_BUILDER = `
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
  subtitle,
  title[]{...},
  text[]{...},
  title,
  text,
  navColor->,
  overlay,
  topPadding,
  asCarousel,
  disableSummary,
  leftAlign, 
  
  steps[]{
    ...,
    title,
    description,
    involves,
    _type, 
  },
  showArchive{
    ...,
    archive[]->{...},  
  },
  showRecipiesArchive{
    ...,
    archive[]->{
      ..., 
    },
  },
  author->{...},
  featuresTile[]{
    ...,
    link{
      ${LINK},
    },
  },
  teamTiles[]->{...},

  testimonialTiles[]->{
    ...,
    "_rawQuoteText": quoteText,
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
  },
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
  navColor{...},
  navOverlay,
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  ${PAGE_BUILDER},
  title,
  text,
  date,
  author->{...},
  image {
    asset->,
    hotspot{...},
    crop{...}
  },
  navColor{...},
  mobileImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  backgroundColor->,
  textAlign,
  slug,
  companyDetails,
  person,
  _rawPerson,
  coverImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  body[]{
    ...,
    file{
      ...,
      },
    },
  },
  _id,
}`

export const ALL_RECIPIES = groq`*[_type == "recipies" && defined(coverImage)][0..4] {
  _id,
  title,
  ...,
  service->{name},
}`

export const RECIPIES_BY_ID = groq`*[_type == "recipies && defined(coverImage)" && references($categoryId)] {
  _id,
  ...,
  service->{name},
}`

export const RECIPIES_QUERY = groq`*[_type == "recipies && defined(coverImage)" && slug.current == $slug][0] {
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
    navColor->,
    backgroundColor{navColor->, ...},
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
    showRecipiesArchive{
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
  navColor{navColor->, ...},
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
  coverImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  body[]{
    ...,
    file{
      ...,
      },
    },
  },
  _id,
}`

export const CATEGORIES_QUERY = groq`*[_type == "recipies" && slug.current == $slug][0] {
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
    navColor->,
    backgroundColor{navColor->, ...},
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
    showRecipiesArchive{
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
  navColor{navColor->, ...},
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
  coverImage {
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
  navColor{navColor->, ...},
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
  coverImage {
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
  category->{
    ...,
    slug,
  },
  author->{...},
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ${PAGE_BUILDER},
  title,
  text,
  image {
    asset->,
    hotspot{...},
    crop{...}
  },
  navColor{navColor->, ...},
  
  mobileImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  textAlign,
  slug->,
  companyDetails,
  _rawPerson,
  coverImage {
    asset->,
    hotspot{...},
    crop{...}
  },
  _id,
  
}`