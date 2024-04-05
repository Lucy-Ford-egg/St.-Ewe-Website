import groq from 'groq'

// * Helpful - https://www.sanity.io/docs/query-cheat-sheet

export const SITE_SETTINGS = groq`*[_type == "siteSettings"] {
  ...,
  text[]{...},
}`

export const NAV_QUERY = groq`*[_type in ["post", "page", "caseStudy", "teamMember"] && slug.current == $slug][0] {
  navColor{...},
  navOverlay,
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
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
      link{
        internal->{
          slug {
            current
          }
        },
        external{...},
      },
      text,
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
    author->{...}, 
    steps[]{
      title,
      description,
      involves,
      _type, 
      text[]{...},
    },
    showArchive{
      ...,
      archive[]->{...},  
    },
    showCaseStudyArchive{
      ...,
      archive[]->{
        ..., 
      },
    },
    teamTiles[]->{...},
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
  date,
  author->{...},
  image {
    asset->,
    hotspot{...},
    crop{...}
  },
  navColor{...},
  tileColor{...},
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
  body[]{...},
  _id,
}`

export const ALL_CASE_STUDIES = groq`*[_type == "caseStudy"] {
  _id,
  title,
  ...,
  service->{name},
}`

export const CASE_STUDIES_BY_ID = groq`*[_type == "caseStudy" && references($categoryId)] {
  _id,
  ...,
  service->{name},
}`

export const CASE_STUDY_QUERY = groq`*[_type == "caseStudy" && slug.current == $slug][0] {
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
      link{
        internal->{
          slug {
            current
          }
        },
        external{...},
      },
      text,
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
    showCaseStudyArchive{
      ...,
      archive[]->{
        ..., 
      },
    },
    teamTiles[]->{...},
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
      link{
        internal->{
          slug {
            current
          }
        },
        external{...},
      },
      text,
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
    showCaseStudyArchive{
      ...,
      archive[]->{
        ..., 
      },
    },
    tileColor->{...},
    teamTiles[]->{...},
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
  bio[]{...},
  _id,
}`

export const ALL_POSTS = groq`*[_type == "post"] {
  _id,
  title,
  ...,
  category->{...},
}`

export const POSTS_BY_ID = groq`*[_type == "post" && references($categoryId)] {
  _id,
  ...,
  category->{...},
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
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
      link{
        internal->{
          ...,
          slug {
            current
          }
        },
        external{...},
      },
      text,
    },
    subtitle,
    title[]{...},
    text[]{...},
    title,
    text,
    navColor->,
    overlay,
    topPadding,
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
    showCaseStudyArchive{
      ...,
      archive[]->{
        ..., 
      },
    },
    author->{...},
    featuresTile[]{
      ...,
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