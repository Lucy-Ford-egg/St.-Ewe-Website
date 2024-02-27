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
    },
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
}`