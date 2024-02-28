import groq from 'groq'

// * Helpful - https://www.sanity.io/docs/query-cheat-sheet

export const SITE_SETTINGS = groq`*[_type == "siteSettings"] {
  ...,
}`

export const postQuery =  groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  title,
  image {
    asset->,
  },
  mobileImage {
    asset->,
  },
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

export const ALL_POSTS = groq`*[_type == "post"] {
  _id,
  title,
  ...,
}`

export const POSTS_BY_ID = groq`*[_type == "post" && references($categoryId)] {
  _id,
  ...,
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  pageBuilder[] {
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
      ...,
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
  },
  navColor{navColor->, ...},
  mobileImage {
    asset->,
  },
  textAlign,
  slug->,
  companyDetails,
  _rawPerson,
  coverImage {
    asset->,
  },
  _id,
  
}`